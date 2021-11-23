<template>
	<b-modal
		:no-close-on-backdrop="isLoading"
		:no-close-on-esc="isLoading"
		id="lectureForm"
		@hidden="resetModal"
		hide-footer
		@ok="handleSave"
		size="lg"
		@show="modalIsShown"
	>
		<template #modal-header="{ close }">
			<div class="d-flex align-items-center justify-content-between w-100">
				<div class="d-flex align-items-center">
					<template v-if="isUpdate">
						<h6 class="mb-0">Update Lecture</h6>
					</template>
					<template v-else>
						<h6 class="mb-0">Create Lecture</h6>
					</template>
				</div>
				<b-button :disabled="isLoading" size="sm" variant="outline-danger" @click="close()"> Close </b-button>
			</div>
		</template>
		<template #default="{ ok }">
			<b-form @submit.prevent="handleSave">
				<!-- -------------Title------------- -->
				<b-form-group label="Lecture Title" label-for="title">
					<b-form-input :disabled="isLoading" id="title" v-model="lecture.title" ref="titleInput"></b-form-input>
					<input-error :vuelidate="$v.lecture.title" field="title" :namespace="namespace" />
				</b-form-group>

				<!-- -------------Description------------- -->
				<b-form-group label="Lecture Description" label-for="description">
					<vue-editor :disabled="isLoading" style="border: none" v-model="lecture.description" :editorToolbar="customToolbar"></vue-editor>
					<input-error :vuelidate="$v.lecture.description" field="description" :namespace="namespace" />
				</b-form-group>

				<div class="d-flex align-items-center justify-content-end">
					<b-form-checkbox class="mr-3" v-if="!isUpdate" v-model="stillOpen"> Still Here </b-form-checkbox>
					<b-overlay :show="isLoading" rounded opacity="0.6" spinner-small spinner-variant="primary" class="d-inline-block">
						<b-btn :disabled="isLoading" v-if="isUpdate" @click="ok()" variant="outline-success">Update</b-btn>
						<b-btn :disabled="isLoading" v-else @click="ok()" variant="outline-primary">Save</b-btn>
					</b-overlay>
				</div>
			</b-form>
		</template>
	</b-modal>
</template>

<script>
	import { VueEditor } from "vue2-editor";
	import { required, minLength, maxLength } from "vuelidate/lib/validators";

	export default {
		components: { VueEditor },
		data() {
			return {
				namespace: "Course",
				lecture: { title: null, description: null },
				customToolbar: [
					[{ header: [false, 1, 2, 3, 4, 5, 6] }],
					["bold", "italic", "underline", "strike"],
					[{ align: "" }, { align: "center" }, { align: "right" }, { align: "justify" }],
					["blockquote", "code-block"],
					[{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
					[{ indent: "-1" }, { indent: "+1" }],
					[{ color: [] }, { background: [] }],
					// ["link", "image", "video"],
					["clean"]
				],
				stillOpen: false
			};
		},

		validations: {
			lecture: {
				title: { required, minLength: minLength(3), maxLength: maxLength(54) },
				description: { maxLength: maxLength(5120) }
			}
		},

		computed: {
			oldLecture() {
				return this.$store.state.Course.oneLecture;
			},

			isUpdate() {
				return !!this.oldLecture && !!this.oldLecture._id;
			},

			section() {
				return this.$store.state.Course.oneSection;
			}
		},

		methods: {
			async handleSave(bvt) {
				bvt.preventDefault();

				this.$v.$touch();

				if (this.$v.$invalid) return;

				let res;

				try {
					this.setLoading(true);

					if (this.isUpdate) {
						res = await this.$store.dispatch("Course/updateLecture", this.lecture);
					} else {
						res = await this.$store.dispatch("Course/createLecture", this.lecture);
					}

					this.setGlobalSuccess(res.msg);

					this.resetModal();

					setTimeout(() => this.$refs.titleInput.focus(), 400);

					if (!this.stillOpen || this.isUpdate) {
						this.$bvModal.hide("lectureForm");
					}
				} catch (err) {
					//
				}

				this.setLoading(false);
			},

			modalIsShown() {
				setTimeout(() => this.$refs.titleInput.focus(), 400);

				if (this.isUpdate) {
					this.lecture = { ...this.oldLecture };
				}
			},

			resetModal() {
				this.$v.$reset();

				this.removeAllErrors();

				this.lecture = { title: null, description: null };
			}
		}
	};

	// videoReview.seekable.start(); // Returns the starting time (in seconds)
	// videoReview.seekable.end();    // Returns the ending time (in seconds)
	// videoReview.currentTime = 122; // Seek to 122 seconds
	// videoReview.played.end();
</script>
