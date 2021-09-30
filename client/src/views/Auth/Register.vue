<template>
	<div class="register-page d-flex flex-column align-items-center bg-white py-5">
		<b-navbar-brand to="/">
			<img :src="require('@/assets/images/logo-dark.png')" class="d-inline-block align-top" alt="Academy" height="35" />
		</b-navbar-brand>
		<h2 class="font-weight-900 my-3">Create a new account</h2>
		<div>
			Or
			<router-link to="/login" class="text-primary text-decoration-none"> Sign in to your account </router-link>
		</div>
		<b-row class="mt-4 w-100 justify-content-center">
			<b-col cols="12" sm="8" lg="6" xl="4">
				<b-card class="shadow">
					<RegisterForm @signedUp="() => $router.push('/login')" />
				</b-card>
			</b-col>
		</b-row>
	</div>
</template>

<script>
	import RegisterForm from "@/components/auth/RegisterForm";
	export default {
		components: { RegisterForm },

		mounted() {
			this.$store.commit("setLoader", false);
		}
	};
</script>

<style scoped lang="scss">
	.register-page {
		min-height: 100vh;
	}
</style>
