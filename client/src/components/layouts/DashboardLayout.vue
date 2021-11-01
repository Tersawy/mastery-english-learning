<template>
	<div class="dashboard-content">
		<UploadList />
		<DashboardNavbar @toggleSidebar="sidebar = !sidebar" />
		<b-container fluid class="px-xl-4">
			<div class="py-5">
				<b-row>
					<b-col lg="3" class="d-none d-lg-block">
						<DashboardSidebar />
					</b-col>
					<b-col lg="9">
						<slot> </slot>
					</b-col>
				</b-row>
			</div>
		</b-container>
		<b-sidebar v-model="sidebar" bg-variant="light" backdrop-variant="dark" backdrop shadow header-class="border-bottom">
			<template #header="{ hide }">
				<div class="d-flex align-items-center justify-content-between w-100">
					<img :src="require('@/assets/images/logo-dark.png')" class="d-inline-block align-top" alt="Academy" height="35" />
					<span @click="hide" class="p-2 c-pointer">&times;</span>
				</div>
			</template>
			<DashboardLinks />
		</b-sidebar>
	</div>
</template>

<script>
	import DashboardNavbar from "@/components/layouts/DashboardNavbar";
	import DashboardSidebar from "@/components/layouts/DashboardSidebar";
	import DashboardLinks from "@/components/DashboardLinks";
	import UploadList from "@/components/UploadList";

	export default {
		components: { DashboardNavbar, DashboardSidebar, DashboardLinks, UploadList },

		data() {
			return {
				sidebar: false
			};
		},

		methods: {
			signed() {
				setTimeout(() => this.$router.go(0), 300);
			}
		}
	};
</script>
