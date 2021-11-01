<template>
	<dashboard-layout>
		<b-breadcrumb class="bg-white border rounded shadow-sm font-weight-600 mb-30px">
			<b-breadcrumb-item to="/dashboard">
				<b-icon class="mr-1" icon="house-fill" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
				Dashboard
			</b-breadcrumb-item>
			<b-breadcrumb-item active> Settings </b-breadcrumb-item>
		</b-breadcrumb>

		<b-row cols="3">
			<b-col>
				<Levels />
			</b-col>
			<b-col>
				<Categories />
			</b-col>
			<b-col>
				<Languages />
			</b-col>
		</b-row>
	</dashboard-layout>
</template>

<script>
	import Levels from "@/components/dashboard/setting/Levels.vue";
	import Categories from "@/components/dashboard/setting/Categories.vue";
	import Languages from "@/components/dashboard/setting/Languages.vue";
	import DashboardLayout from "@/components/layouts/DashboardLayout.vue";
	export default {
		components: { DashboardLayout, Levels, Categories, Languages }
	};
</script>

<style lang="scss" scoped></style>
