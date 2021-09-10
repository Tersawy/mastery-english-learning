<template>
	<b-modal
		:no-close-on-backdrop="isLoading"
		:no-close-on-esc="isLoading"
		id="categoryForm"
		@hidden="resetModal"
		hide-footer
		@ok="handleSave"
		centered
		@show="modalIsShown"
	>
		<template #modal-header="{ close }">
			<div class="d-flex align-items-center justify-content-between w-100">
				<div class="d-flex align-items-center">
					<template v-if="isUpdate">
						<h6 class="mb-0">
							Update Category: <b-badge variant="outline-success">{{ oldCategory.name }}</b-badge>
						</h6>
					</template>
					<template v-else>
						<h6 class="mb-0">Create Category</h6>
					</template>
				</div>
				<b-button :disabled="isLoading" size="sm" variant="outline-danger" @click="close()"> Close </b-button>
			</div>
		</template>
		<template #default="{ ok }">
			<b-form @submit.prevent="handleSave">
				<!-- -------------Name------------- -->
				<b-form-group label="Category Name" label-for="name">
					<b-form-input :disabled="isLoading" id="name" v-model="category.name" ref="nameInput"></b-form-input>
					<input-error :vuelidate="$v.category.name" field="name" :namespace="namespace" />
				</b-form-group>

				<div class="text-right">
					<b-overlay :show="isLoading" rounded opacity="0.6" spinner-small spinner-variant="primary" class="d-inline-block" @hidden="toggleLoading">
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
				namespace: "Category",
				category: { name: null }
			};
		},

		validations: {
			category: {
				name: { required, minLength: minLength(3), maxLength: maxLength(54) }
			}
		},

		computed: {
			oldCategory() {
				return this.$store.state.Category.one;
			},
			isUpdate() {
				return !!this.oldCategory && !!this.oldCategory._id;
			}
		},

		methods: {
			async handleSave(bvt) {
				bvt.preventDefault();

				this.$v.$touch();

				if (this.$v.$invalid) return;

				let res;

				try {
					this.toggleLoading();

					if (this.isUpdate) {
						res = await this.$store.dispatch("Category/update", this.category);
					} else {
						res = await this.$store.dispatch("Category/create", this.category);
					}

					await this.$store.dispatch("Category/all");

					this.$bvModal.hide("categoryForm");

					this.setGlobalSuccess(res.msg);
				} catch (err) {
					if (err) console.log(err);
				}

				this.toggleLoading();
			},

			modalIsShown() {
				setTimeout(() => this.$refs.nameInput?.focus(), 400);

				if (this.isUpdate) {
					this.category = { ...this.oldCategory };
				}
			},

			resetModal() {
				this.$v.$reset();

				this.removeAllErrors();

				this.category.name = null;
			}
		}
	};
</script>

<style lang="scss" scoped></style>
