<template>
	<div class="register-page d-flex flex-column align-items-center justify-content-center bg-white">
		<b-img :src="require('@/assets/images/logo-dark.png')" height="35"></b-img>
		<h2 class="font-weight-900 my-3">Create a new account</h2>
		<div>
			Or
			<router-link to="/login" class="text-primary text-decoration-none"> Sign in to your account </router-link>
			<!-- <a href="" class="text-primary text-decoration-none">create a new account</a> -->
		</div>
		<b-row class="mt-4 w-100 justify-content-center">
			<b-col cols="7">
				<b-card class="shadow">
					<b-form @submit="handleRegister">
						<b-form-group label="Fullname" label-for="fullname">
							<b-form-input type="text" id="fullname" v-model.trim="register.fullname" />
							<input-error :vuelidate="$v.register.fullname" field="fullname" :namespace="namespace" />
						</b-form-group>

						<b-form-group label="Phone" label-for="phone">
							<b-form-input type="tel" id="phone" v-model.trim="register.phone" />
							<input-error :vuelidate="$v.register.phone" field="phone" :namespace="namespace" />
						</b-form-group>

						<b-form-group label="Username" label-for="username">
							<b-form-input type="text" id="username" v-model.trim="register.username" />
							<input-error :vuelidate="$v.register.username" field="username" :namespace="namespace" />
						</b-form-group>

						<b-form-group label="Email address" label-for="email">
							<b-form-input type="email" id="email" v-model.trim="register.email" />
							<input-error :vuelidate="$v.register.email" field="email" :namespace="namespace" />
						</b-form-group>

						<b-form-group label="Password" label-for="password">
							<b-form-input type="password" id="password" v-model.trim="register.password" />
							<input-error :vuelidate="$v.register.password" field="password" :namespace="namespace" />
						</b-form-group>

						<b-form-group label="Confirm Password" label-for="repeatPassword">
							<b-form-input type="password" id="repeatPassword" v-model.trim="register.repeatPassword" />
							<input-error :vuelidate="$v.register.repeatPassword" field="repeatPassword" :namespace="namespace" />
						</b-form-group>

						<b-form-checkbox id="type" v-model="register.type" name="type"> Instructor ? </b-form-checkbox>
						<b-btn block variant="primary" class="mt-3" @click="handleRegister">Sign up</b-btn>
					</b-form>
				</b-card>
			</b-col>
		</b-row>
	</div>
</template>

<script>
	import { required, email, minLength, maxLength, sameAs } from "vuelidate/lib/validators";
	export default {
		data() {
			return {
				namespace: "Auth",
				register: {
					fullname: null,
					username: null,
					phone: null,
					email: null,
					password: null,
					repeatPassword: null,
					type: false
				}
			};
		},

		validations() {
			let register = {
				fullname: { required, minLength: minLength(6), maxLength: maxLength(54) },
				username: { required, minLength: minLength(3), maxLength: maxLength(54) },
				phone: { required, minLength: minLength(4), maxLength: maxLength(54) },
				email: { required, email },
				password: { required, minLength: minLength(8), maxLength: maxLength(54) },
				repeatPassword: { sameAsPassword: sameAs("password") }
			};

			return { register };
		},

		methods: {
			async handleRegister() {
				this.$v.$touch();

				if (this.$v.$invalid) return;

				try {
					let data = await this.$store.dispatch("Auth/register", this.register);

					if (data.msg) this.setGlobalSuccess(data.msg);

					this.resetForm();

					this.$router.push("/login");
				} catch (err) {
					//
				}
			},

			resetForm() {
				this.$v.$reset();

				this.register = {
					fullname: null,
					username: null,
					phone: null,
					email: null,
					password: null,
					repeatPassword: null,
					type: false
				};
			}
		}
	};
</script>

<style scoped lang="scss">
	.register-page {
		height: 100vh;
		padding: 60px;
	}
</style>
