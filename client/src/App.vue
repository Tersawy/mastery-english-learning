<template>
	<div id="app">
		<div id="dashboard-content" v-if="isDashboard">
			<UploadList />
			<NavbarDashboard @toggleSidebar="sidebar = !sidebar" />
			<b-container fluid class="px-xl-4">
				<div class="py-5">
					<b-row>
						<b-col lg="3" class="d-none d-lg-block">
							<SidebarDashboard />
						</b-col>
						<b-col lg="9">
							<router-view />
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
				<Dashboard-links />
			</b-sidebar>
		</div>
		<div id="main-content" v-else>
			<Navbar v-if="showNavbar" />
			<router-view />
		</div>
		<Loader />
		<UserProfile />
		<RegisterModal @signedUp="signed" />
		<LoginModal @signedIn="signed" />
	</div>
</template>

<script>
	import Navbar from "@/components/layouts/Navbar";
	import NavbarDashboard from "@/components/layouts/NavbarDashboard";
	import SidebarDashboard from "@/components/layouts/SidebarDashboard";
	import DashboardLinks from "@/components/DashboardLinks";
	import UploadList from "@/components/UploadList";
	import Loader from "@/components/Loader";
	import UserProfile from "@/components/UserProfile";

	const RegisterModal = () => import("@/components/auth/RegisterModal.vue");
	const LoginModal = () => import("@/components/auth/LoginModal.vue");

	export default {
		components: { Navbar, NavbarDashboard, SidebarDashboard, DashboardLinks, UploadList, Loader, UserProfile, RegisterModal, LoginModal },

		data() {
			return {
				sidebar: false
			};
		},

		computed: {
			isLoginPage() {
				return this.$route.name == "Login";
			},
			isRegisterPage() {
				return this.$route.name == "Register";
			},
			isDashboard() {
				return !!this.$route.meta.dashboard;
			},
			showNavbar() {
				return !this.isLoginPage && !this.isDashboard && !this.isRegisterPage;
			}
		},

		methods: {
			signed() {
				setTimeout(() => this.$router.go(0), 300);
			}
		}
	};
</script>

<style lang="scss">
	// #app {
	// 	font-family: Avenir, Helvetica, Arial, sans-serif;
	// 	-webkit-font-smoothing: antialiased;
	// 	-moz-osx-font-smoothing: grayscale;
	// 	color: #2c3e50;
	// }

	// #nav {
	// 	padding: 30px;

	// 	a {
	// 		font-weight: bold;
	// 		color: #2c3e50;

	// 		&.router-link-exact-active {
	// 			color: #42b983;
	// 		}
	// 	}
	// }
</style>
