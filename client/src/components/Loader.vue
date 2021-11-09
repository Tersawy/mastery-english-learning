<template>
	<div class="loader" v-if="isLoader">
		<div class="text-center">
			<b-navbar-brand to="/" class="m-0" v-if="settings.logoDark">
				<img :src="appLogo" alt="Academy" height="55" />
			</b-navbar-brand>
			<div>
				<b-spinner class="spinner" type="grow" variant="primary" label="Loading..."></b-spinner>&nbsp;&nbsp;
				<b-spinner class="spinner" type="grow" variant="primary"></b-spinner>&nbsp;&nbsp;
				<b-spinner class="spinner" type="grow" variant="primary"></b-spinner>&nbsp;&nbsp;
				<b-spinner class="spinner" type="grow" variant="primary"></b-spinner>&nbsp;&nbsp;
				<b-spinner class="spinner" type="grow" variant="primary"></b-spinner>&nbsp;&nbsp;
				<b-spinner class="spinner" type="grow" variant="primary"></b-spinner>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		computed: {
			isLoader() {
				return this.$store.state.isLoader;
			}
		}
	};
</script>

<style lang="scss" scoped>
	.loader {
		position: fixed;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100vw;
		height: 100vh;
		left: 0;
		top: 0;
		z-index: 1059;
		&:before {
			z-index: -1;
			content: "";
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background-color: #fff;
		}
		.spinner {
			z-index: 1;
		}
	}
</style>
