<template>
	<b-modal id="loginModal" hide-header hide-footer centered body-class="p-4 d-flex flex-column align-items-center">
		<b-navbar-brand to="/">
			<img :src="appLogo" class="d-inline-block align-top" alt="Academy" height="35" />
		</b-navbar-brand>
		<h2 class="font-weight-900 my-3">Sign in to your account</h2>
		<div class="mb-4">
			Or
			<a class="text-primary text-decoration-none c-pointer" @click="register"> Create a new account </a>
		</div>
		<LoginForm @signedIn="signedIn" />
	</b-modal>
</template>

<script>
	import LoginForm from "@/components/auth/LoginForm";
	export default {
		components: { LoginForm },

		methods: {
			register() {
				this.$bvModal.show("registerModal");
				this.$bvModal.hide("loginModal");
			},
			signedIn() {
				this.$bvModal.hide("loginModal");
				this.$emit("signedIn");
			}
		}
	};
</script>

<style lang="scss">
	.modal {
		padding-right: 0 !important;
	}
</style>
