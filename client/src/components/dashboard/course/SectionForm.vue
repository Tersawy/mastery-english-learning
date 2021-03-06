<template>
	<b-modal
		:no-close-on-backdrop="isLoading"
		:no-close-on-esc="isLoading"
		id="sectionForm"
		@hidden="hideModal"
		hide-footer
		@ok="handleSave"
		size="lg"
		@show="modalIsShown"
	>
		<template #modal-header="{ close }">
			<div class="d-flex align-items-center justify-content-between w-100">
				<div class="d-flex align-items-center">
					<template v-if="isUpdate">
						<h6 class="mb-0">Update Section</h6>
					</template>
					<template v-else>
						<h6 class="mb-0">Create Section</h6>
					</template>
				</div>
				<b-button :disabled="isLoading" size="sm" variant="outline-danger" @click="close()"> Close </b-button>
			</div>
		</template>
		<template #default="{ ok }">
			<b-form @submit.prevent="handleSave">
				<!-- -------------Title------------- -->
				<b-form-group label="Section Title" label-for="title">
					<b-form-textarea :disabled="isLoading" id="title" ref="titleInput" v-model="section.title"></b-form-textarea>
					<input-error :vuelidate="$v.section.title" field="title" :namespace="namespace" />
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
	import { required, minLength, maxLength } from "vuelidate/lib/validators";

	export default {
		data() {
			return {
				namespace: "Course",
				section: {
					title: null
				},
				stillOpen: false
			};
		},

		validations: {
			section: {
				title: { required, minLength: minLength(3), maxLength: maxLength(54) }
			}
		},

		computed: {
			oldSection() {
				return this.$store.state.Course.oneSection;
			},
			isUpdate() {
				return !!this.oldSection && !!this.oldSection._id;
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
						res = await this.$store.dispatch("Course/updateSection", this.section);
					} else {
						res = await this.$store.dispatch("Course/createSection", this.section);
					}

					this.setGlobalSuccess(res.msg);

					this.resetModal();

					if (this.$refs.titleInput) setTimeout(() => this.$refs.titleInput.focus(), 400);

					if (!this.stillOpen || this.isUpdate) {
						this.$nextTick(() => {
							this.$bvModal.hide("sectionForm");

							this.$bvModal.show("sections");
						});
					}
				} catch (err) {
					if (err) console.log(err);
				}

				this.setLoading(false);
			},

			modalIsShown() {
				setTimeout(() => this.$refs.titleInput?.focus(), 400);

				if (this.isUpdate) {
					this.section = { ...this.oldSection };
				}
			},

			resetModal() {
				this.$v.$reset();

				this.removeAllErrors();

				this.section.title = null;
			},

			hideModal() {
				this.resetModal();

				this.$emit("closed");
			}
		}
	};
</script>
