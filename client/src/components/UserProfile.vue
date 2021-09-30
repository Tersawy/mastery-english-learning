<template>
	<b-sidebar id="userProfile" v-model="isShown" bg-variant="light" backdrop-variant="dark" backdrop shadow header-class="border-bottom px-3 py-1">
		<template #header="{ hide }">
			<div class="d-flex align-items-center justify-content-between w-100">
				<img :src="require('@/assets/images/logo-dark.png')" class="d-inline-block align-top" alt="Academy" height="35" />
				<span @click="hide" class="p-2 c-pointer">&times;</span>
			</div>
		</template>
		<div class="p-3">
			<div class="text-center">
				<b-avatar class="user-avatar" variant="primary" :src="`${userImageURL}/${me.image}`" size="6rem" v-b-modal.changeProfileImage></b-avatar>
				<div class="font-weight-700 mt-3 font-md">{{ me.username }}</div>
			</div>
			<b-form @submit="updateProfile">
				<b-form-group label="Fullname" label-for="fullname">
					<b-form-input type="text" id="fullname" v-model.trim="user.fullname" />
					<input-error :vuelidate="$v.user.fullname" field="fullname" :namespace="namespace" />
				</b-form-group>

				<b-form-group label="Phone" label-for="phone">
					<b-form-input type="tel" id="phone" v-model.trim="user.phone" />
					<input-error :vuelidate="$v.user.phone" field="phone" :namespace="namespace" />
				</b-form-group>

				<b-form-group label="Username" label-for="username">
					<b-form-input type="text" id="username" v-model.trim="user.username" />
					<input-error :vuelidate="$v.user.username" field="username" :namespace="namespace" />
				</b-form-group>

				<b-form-group label="Email address" label-for="email">
					<b-form-input type="email" id="email" v-model.trim="user.email" :value="me.email" />
					<input-error :vuelidate="$v.user.email" field="email" :namespace="namespace" />
				</b-form-group>

				<b-form-group label="Password" label-for="password" description="Leave it empty if you don't need to change it">
					<b-form-input type="password" id="password" v-model.trim="user.password" />
					<input-error :vuelidate="$v.user.password" field="password" :namespace="namespace" />
				</b-form-group>

				<b-form-group label="Confirm Password" label-for="repeatPassword" v-if="user.password">
					<b-form-input type="password" id="repeatPassword" v-model.trim="user.repeatPassword" />
					<input-error :vuelidate="$v.user.repeatPassword" field="repeatPassword" :namespace="namespace" />
				</b-form-group>

				<b-overlay :show="isLoading" rounded opacity="0.6" spinner-small spinner-variant="primary">
					<b-btn :disabled="isLoading" block variant="primary" class="mt-3" @click="updateProfile">Save</b-btn>
				</b-overlay>
			</b-form>
		</div>
		<b-modal id="changeProfileImage" hide-footer body-class="text-center" :no-close-on-backdrop="isLoading" :no-close-on-esc="isLoading">
			<template #modal-header="{ close }">
				<div class="d-flex align-items-center justify-content-between w-100">
					<h6 class="mb-0">Change Your Image</h6>
					<b-button size="sm" variant="outline-danger" @click="close()"> Close </b-button>
				</div>
			</template>
			<template #default>
				<b-form-file accept=".jpg, .png, .jpeg" v-model="image"></b-form-file>
				<b-avatar v-if="image" class="mt-3" variant="primary" :src="imageReview" size="6rem"></b-avatar>
				<b-overlay v-if="image" :show="isLoading" rounded opacity="0.6" spinner-small spinner-variant="primary">
					<b-btn :disabled="isLoading" block variant="primary" class="mt-3" @click="updateProfileImage">Save</b-btn>
				</b-overlay>
			</template>
		</b-modal>
	</b-sidebar>
</template>

<script>
	import { required, email, minLength, maxLength, sameAs } from "vuelidate/lib/validators";
	export default {
		data() {
			return {
				namespace: "Auth",
				user: {
					fullname: null,
					username: null,
					phone: null,
					email: null,
					password: null,
					repeatPassword: null
				},
				image: null,
				isShown: false
			};
		},

		validations() {
			let user = {
				fullname: { required, minLength: minLength(6), maxLength: maxLength(54) },
				username: { required, minLength: minLength(3), maxLength: maxLength(54) },
				phone: { required, minLength: minLength(4), maxLength: maxLength(54) },
				email: { required, email },
				password: { minLength: minLength(8), maxLength: maxLength(54) },
				repeatPassword: { sameAsPassword: sameAs("password") }
			};

			return { user };
		},

		mounted() {
			this.user = { ...this.me };
		},

		watch: {
			image(v) {
				if (!v) return;

				let extensionsAvailable = ["image/jpg", "image/jpeg", "image/png"];

				if (!extensionsAvailable.includes(v.type)) {
					this.image = null;
					return this.setGlobalError("Image is not valid");
				}
			}
		},

		computed: {
			imageReview() {
				if (!this.image) return null;

				let imageURL = URL.createObjectURL(this.image);

				return imageURL;
			}
		},

		methods: {
			async updateProfile() {
				this.$v.$touch();

				if (this.$v.$invalid) return;

				this.setLoading(true);

				try {
					let data = await this.$store.dispatch("Auth/updateProfile", this.user);

					if (data.msg) this.setGlobalSuccess(data.msg);
				} catch (err) {
					//
				}

				this.isShown = false;

				this.setLoading(false);
			},

			async updateProfileImage() {
				if (!this.image) return;

				this.setLoading(true);

				let formData = new FormData();

				formData.set("image", this.image);

				let config = { headers: { "Content-Type": "multipart/form-data" } };

				try {
					let data = await this.$store.dispatch("Auth/updateProfileImage", { formData, config });

					if (data.msg) this.setGlobalSuccess(data.msg);
				} catch (err) {
					//
				}

				this.$bvModal.hide("changeProfileImage");

				this.image = null;

				this.setLoading(false);
			}
		}
	};
</script>

<style lang="scss" scoped>
	.user-avatar {
		&::before {
			content: "\f01e";
			position: absolute;
			width: 100%;
			height: 100%;
			z-index: 1;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: rgba(0, 0, 0, 0.3);
			font-family: "Font Awesome 5 Free";
			font-weight: 900;
			font-size: 24px;
			color: white;
			cursor: pointer;
			opacity: 0;
			transition: 0.2s opacity ease-in-out;
		}
		&:hover {
			&:before {
				opacity: 1;
			}
		}
	}
</style>
