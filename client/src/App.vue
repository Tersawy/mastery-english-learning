<template>
	<div id="app">
		<router-view />
		<Loader />
		<UserProfile />
	</div>
</template>

<script>
	import Loader from "@/components/Loader";

	const UserProfile = () => import("@/components/UserProfile");

	export default {
		components: { Loader, UserProfile }
	};
</script>
