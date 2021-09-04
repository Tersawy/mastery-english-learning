<template>
	<ul class="sidebar-list list-unstyled mb-0">
		<li class="sidebar-item" v-for="(item, i) in items" :key="i">
			<router-link :to="item.path" :exact="i == 0" class="p-3 d-flex align-items-center text-decoration-none">
				<h4 class="mb-0 mr-3">
					<b-icon :icon="item.icon"></b-icon>
				</h4>
				<span class="">{{ item.text }}</span>
			</router-link>
		</li>
	</ul>
</template>

<script>
	export default {
		data() {
			return {
				items: [
					{ text: "Dashboard", icon: "grid", path: "/dashboard" },
					{ text: "Courses", icon: "collection", path: "/dashboard/courses" },
					{ text: "Students", icon: "people", path: "/dashboard/students" },
					{ text: "Instructors", icon: "person-plus", path: "/dashboard/instructors" },
					{ text: "Admins", icon: "diagram3", path: "/dashboard/admins" },
					{ text: "Settings", icon: "gear", path: "/dashboard/settings" }
				]
			};
		}
	};
</script>

<style lang="scss" scoped>
	.sidebar-list {
		.sidebar-item {
			& > a {
				color: #333;
				&.router-link-active,
				&:hover {
					background: var(--primary);
					color: white;
					font-weight: 600 !important;
				}
			}
		}
	}
</style>
