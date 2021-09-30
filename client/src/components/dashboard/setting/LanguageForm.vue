<template>
	<b-modal
		:no-close-on-backdrop="isLoading"
		:no-close-on-esc="isLoading"
		id="languageForm"
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
							Update Language: <b-badge variant="outline-success">{{ oldLanguage.name }}</b-badge>
						</h6>
					</template>
					<template v-else>
						<h6 class="mb-0">Create Language</h6>
					</template>
				</div>
				<b-button :disabled="isLoading" size="sm" variant="outline-danger" @click="close()"> Close </b-button>
			</div>
		</template>
		<template #default="{ ok }">
			<b-form @submit.prevent="handleSave">
				<!-- -------------Name------------- -->
				<b-form-group label="Language Name" label-for="name">
					<b-form-input :disabled="isLoading" id="name" v-model="language.name" ref="nameInput"></b-form-input>
					<input-error :vuelidate="$v.language.name" field="name" :namespace="namespace" />
				</b-form-group>

				<div class="text-right">
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
				namespace: "Language",
				language: { name: null }
			};
		},

		validations: {
			language: {
				name: { required, minLength: minLength(3), maxLength: maxLength(54) }
			}
		},

		computed: {
			oldLanguage() {
				return this.$store.state.Language.one;
			},
			isUpdate() {
				return !!this.oldLanguage && !!this.oldLanguage._id;
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
						res = await this.$store.dispatch("Language/update", this.language);
					} else {
						res = await this.$store.dispatch("Language/create", this.language);
					}

					await this.$store.dispatch("Language/all");

					this.$bvModal.hide("languageForm");

					this.setGlobalSuccess(res.msg);
				} catch (err) {
					if (err) console.log(err);
				}

				this.setLoading(false);
			},

			modalIsShown() {
				setTimeout(() => this.$refs.nameInput?.focus(), 400);

				if (this.isUpdate) {
					this.language = { ...this.oldLanguage };
				}
			},

			resetModal() {
				this.$v.$reset();

				this.removeAllErrors();

				this.language.name = null;
			}
		}
	};
</script>

<style lang="scss" scoped></style>
