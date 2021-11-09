<template>
	<div class="login-page d-flex flex-column align-items-center bg-white py-5">
		<b-navbar-brand to="/">
			<img :src="appLogo" class="d-inline-block align-top" alt="Academy" height="35" />
		</b-navbar-brand>
		<h2 class="font-weight-900 my-3">Sign in to your account</h2>
		<div>
			Or
			<router-link to="/register" class="text-primary text-decoration-none"> create a new account </router-link>
		</div>
		<b-row class="mt-4 w-100 justify-content-center">
			<b-col cols="12" sm="8" lg="6" xl="4">
				<b-card class="shadow">
					<LoginForm @signedIn="() => $router.push('/')" />
				</b-card>
			</b-col>
		</b-row>
	</div>
</template>

<script>
	import LoginForm from "@/components/auth/LoginForm";
	export default {
		components: { LoginForm },

		mounted() {
			this.$store.commit("setLoader", false);
		}
	};
</script>

<style scoped lang="scss">
	.login-page {
		min-height: 100vh;
	}
</style>
