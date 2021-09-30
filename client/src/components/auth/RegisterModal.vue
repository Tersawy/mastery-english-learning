<template>
	<b-modal id="registerModal" hide-header hide-footer centered body-class="p-4 d-flex flex-column align-items-center">
		<b-navbar-brand to="/">
			<img :src="require('@/assets/images/logo-dark.png')" class="d-inline-block align-top" alt="Academy" height="35" />
		</b-navbar-brand>
		<h2 class="font-weight-900 my-3">Create a new account</h2>
		<div class="mb-4">
			Or
			<a class="text-primary text-decoration-none c-pointer" @click="login"> Sign in to your account </a>
		</div>
		<RegisterForm @signedUp="signedUp" />
	</b-modal>
</template>

<script>
	import RegisterForm from "@/components/auth/RegisterForm";
	export default {
		components: { RegisterForm },
		methods: {
			signedUp() {
				this.$emit("signedUp");
				this.$bvModal.hide("registerModal");
				this.$bvModal.show("loginModal");
			},

			login() {
				this.$bvModal.show("loginModal");
				this.$bvModal.hide("registerModal");
			}
		}
	};
</script>
