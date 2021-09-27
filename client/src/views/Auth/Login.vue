<template>
	<div class="login-page d-flex flex-column align-items-center bg-white py-5">
		<b-navbar-brand to="/">
			<img :src="require('@/assets/images/logo-dark.png')" class="d-inline-block align-top" alt="Academy" height="35" />
		</b-navbar-brand>
		<h2 class="font-weight-900 my-3">Sign in to your account</h2>
		<div>
			Or
			<router-link to="/register" class="text-primary text-decoration-none"> create a new account </router-link>
		</div>
		<b-row class="mt-4 w-100 justify-content-center">
			<b-col cols="12" sm="8" lg="6" xl="4">
				<b-card class="shadow">
					<b-form @submit.prevent="handleLogin">
						<b-form-group label="Email address" label-for="email">
							<b-form-input type="text" id="email" v-model.trim="login.email" />
						</b-form-group>
						<b-form-group label="Password" label-for="password">
							<b-form-input type="password" id="password" v-model="login.password" />
						</b-form-group>
						<b-overlay :show="isLoading" rounded opacity="0.6" spinner-small spinner-variant="primary" @hidden="toggleLoading">
							<b-btn type="submit" :disabled="isLoading" block variant="primary" class="mt-3" @click="handleLogin">Sign in</b-btn>
						</b-overlay>
					</b-form>
				</b-card>
			</b-col>
		</b-row>
	</div>
</template>

<script>
	import { required, email, minLength, maxLength } from "vuelidate/lib/validators";
	export default {
		data() {
			return {
				login: {
					email: null,
					password: null,
					remember: false
				}
			};
		},

		validations() {
			let login = {
				email: { required, email },
				password: { required, minLength: minLength(8), maxLength: maxLength(54) }
			};

			return { login };
		},

		mounted() {
			this.$store.commit("setLoader", false);
		},

		methods: {
			async handleLogin() {
				this.$v.$touch();

				if (!this.login.email || !this.login.password) return;

				if (this.$v.login.$invalid) {
					return this.setGlobalError("Email or password are not valid");
				}

				this.toggleLoading();

				try {
					await this.$store.dispatch("Auth/login", this.login);
				} catch (err) {
					//
				}

				this.toggleLoading();
			}
		}
	};
</script>

<style scoped lang="scss">
	.login-page {
		min-height: 100vh;
	}
</style>
