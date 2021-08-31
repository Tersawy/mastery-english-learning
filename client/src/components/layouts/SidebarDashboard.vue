<template>
	<b-collapse is_nav visible>
		<div class="sidebar-dashboard">
			<b-card class="shadow-sm d-none d-lg-flex">
				<div class="d-flex flex-column align-items-center">
					<b-avatar :src="require('@/assets/images/user6.jpg')" size="6rem"></b-avatar>
					<span class="mt-3 font-weight-600 text-muted">{{ me.username }}</span>
				</div>
			</b-card>
			<b-card class="mt-30px shadow-sm" body-class="p-0">
				<Dashboard-links />
			</b-card>
		</div>
	</b-collapse>
</template>

<script>
	import DashboardLinks from "@/components/DashboardLinks";
	export default {
		components: { DashboardLinks }
	};
</script>
