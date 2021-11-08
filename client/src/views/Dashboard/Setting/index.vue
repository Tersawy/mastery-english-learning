<template>
	<dashboard-layout>
		<b-breadcrumb class="bg-white border rounded shadow-sm font-weight-600 mb-30px">
			<b-breadcrumb-item to="/dashboard">
				<b-icon class="mr-1" icon="house-fill" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
				Dashboard
			</b-breadcrumb-item>
			<b-breadcrumb-item active> Settings </b-breadcrumb-item>
		</b-breadcrumb>

		<b-row cols="1" cols-md="2" cols-lg="3">
			<b-col>
				<Levels class="shadow-sm" />
			</b-col>
			<b-col class="mt-4 mt-md-0">
				<Categories class="shadow-sm" />
			</b-col>
			<b-col md="12" lg="4" class="mt-4 mt-lg-0">
				<Languages class="shadow-sm" />
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
