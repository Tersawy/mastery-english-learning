<template>
	<b-form @submit.prevent="handleLogin" class="w-100">
		<b-form-group label="Email address" label-for="email">
			<b-form-input type="text" id="email" v-model.trim="login.email" />
		</b-form-group>
		<b-form-group label="Password" label-for="password">
			<b-form-input type="password" id="password" v-model="login.password" />
		</b-form-group>
		<b-overlay :show="isLoading" rounded opacity="0.6" spinner-small spinner-variant="primary">
			<b-btn type="submit" :disabled="isLoading" block variant="primary" class="mt-3">Sign in</b-btn>
		</b-overlay>
	</b-form>
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

				this.setLoading(true);

				try {
					await this.$store.dispatch("Auth/login", this.login);

					this.$emit("signedIn");
				} catch (err) {
					//
				}

				this.setLoading(false);
			}
		}
	};
</script>
