<template>
	<div class="login-page d-flex flex-column align-items-center justify-content-center bg-white">
		<b-img :src="require('@/assets/images/logo-dark.png')" height="35"></b-img>
		<h2 class="font-weight-900 my-3">Sign in to your account</h2>
		<div>
			Or
			<router-link to="/register" class="text-primary text-decoration-none"> create a new account </router-link>
			<!-- <a href="" class="text-primary text-decoration-none">create a new account</a> -->
		</div>
		<b-row class="mt-4 w-100 justify-content-center">
			<b-col cols="7">
				<b-card class="shadow">
					<b-form @submit.prevent="handleLogin">
						<b-form-group label="Email address" label-for="email">
							<b-form-input type="text" id="email" v-model.trim="login.email" />
						</b-form-group>
						<b-form-group label="Password" label-for="password">
							<b-form-input type="password" id="password" v-model="login.password" />
						</b-form-group>
						<!-- <b-form-checkbox id="remember" v-model="login.remember" name="remember"> Remember </b-form-checkbox> -->
						<b-btn block variant="primary" class="mt-3" @click="handleLogin">Sign in</b-btn>
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

		methods: {
			async handleLogin() {
				this.$v.$touch();

				if (!this.login.email || !this.login.password) return;

				if (this.$v.login.$invalid) {
					return this.setGlobalError("Email or password are not valid");
				}

				try {
					await this.$store.dispatch("Auth/login", this.login);
				} catch (err) {
					//
				}
			}
		}
	};
</script>

<style scoped lang="scss">
	.login-page {
		height: 100vh;
		padding: 60px;
	}
</style>
