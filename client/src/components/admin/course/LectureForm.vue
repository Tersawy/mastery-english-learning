<template>
	<b-modal id="lectureForm" @hidden="resetModal" hide-footer @ok="handleSave" size="lg" @show="modalIsShown">
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
				<b-button size="sm" variant="outline-danger" @click="close()"> Close </b-button>
			</div>
		</template>
		<template #default="{ ok }">
			<b-form @submit.prevent="handleSave">
				<!-- -------------Title------------- -->
				<b-form-group label="Lecture Title" label-for="title">
					<b-form-input id="title" v-model="lecture.title" ref="titleInput"></b-form-input>
					<input-error :vuelidate="$v.lecture.title" field="title" :namespace="namespace" />
				</b-form-group>

				<!-- -------------Description------------- -->
				<b-form-group label="Lecture Description" label-for="description">
					<b-form-textarea id="description" v-model="lecture.description"></b-form-textarea>
					<input-error :vuelidate="$v.lecture.description" field="description" :namespace="namespace" />
				</b-form-group>

				<div class="text-right">
					<b-btn v-if="isUpdate" @click="ok()" variant="outline-success">Update</b-btn>
					<b-btn v-else @click="ok()" variant="outline-primary">Save</b-btn>
				</div>
			</b-form>
		</template>
	</b-modal>
</template>

<script>
	import { required, minLength, maxLength } from "vuelidate/lib/validators";

	export default {
		data() {
			return {
				namespace: "Course",
				lecture: { title: null, description: null }
			};
		},

		validations: {
			lecture: {
				title: { required, minLength: minLength(3), maxLength: maxLength(54) },
				description: { maxLength: maxLength(255) }
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
					if (this.isUpdate) {
						res = await this.$store.dispatch("Course/updateLecture", this.lecture);
					} else {
						res = await this.$store.dispatch("Course/createLecture", this.lecture);
					}
					this.setGlobalSuccess(res.msg);
					this.$bvModal.hide("lectureForm");
				} catch (err) {
					//
				}
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
