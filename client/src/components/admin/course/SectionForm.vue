<template>
	<b-modal id="sectionForm" @hidden="resetModal" hide-footer @ok="handleSave" size="lg" @show="modalIsShown">
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
				<b-button size="sm" variant="outline-danger" @click="close()"> Close </b-button>
			</div>
		</template>
		<template #default="{ ok }">
			<b-form @submit.prevent="handleSave">
				<!-- -------------Title------------- -->
				<b-form-group label="Section Title" label-for="title">
					<b-form-textarea id="title" v-model="section.title"></b-form-textarea>
					<input-error :vuelidate="$v.section.title" field="title" :namespace="namespace" />
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
				section: {
					title: null
				}
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
					if (this.isUpdate) {
						res = await this.$store.dispatch("Course/updateSection", this.section);
					} else {
						res = await this.$store.dispatch("Course/createSection", this.section);
					}

					this.$bvModal.hide("sectionForm");

					this.setGlobalSuccess(res.msg);

					this.$nextTick(() => {
						this.$bvModal.show("sections");
					});
				} catch (err) {
					if (err) console.log(err);
				}
			},

			modalIsShown() {
				setTimeout(() => this.$refs.titleInput?.focus(), 400);

				if (this.isUpdate) {
					this.section = { ...this.oldSection };
				}
			},

			resetModal() {
				this.$v.$reset();

				this.section.title = null;

				this.$emit("closed");
			}
		}
	};
</script>
