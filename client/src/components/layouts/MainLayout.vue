<template>
	<div class="main-content">
		<MainNavbar />
		<slot></slot>
		<RegisterModal @signedUp="signed" />
		<LoginModal @signedIn="signed" />
	</div>
</template>

<script>
	import MainNavbar from "@/components/layouts/MainNavbar";

	const RegisterModal = () => import("@/components/auth/RegisterModal.vue");
	const LoginModal = () => import("@/components/auth/LoginModal.vue");

	export default {
		components: { MainNavbar, RegisterModal, LoginModal },

		methods: {
			signed() {
				setTimeout(() => this.$router.go(0), 300);
			}
		}
	};
</script>
