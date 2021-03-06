<template>
	<b-navbar toggleable="xl" variant="white" style="height: 65px" class="bg-white">
		<b-container fluid>
			<b-navbar-brand to="/">
				<img :src="appLogo" class="d-inline-block align-top" alt="Academy" height="35" />
			</b-navbar-brand>

			<div class="d-flex d-xl-none">
				<b-dropdown v-if="isAuth" variant="link" toggle-class="text-decoration-none p-0 mr-3" no-caret right size="lg" lazy menu-class="py-0">
					<template #button-content>
						<b-avatar variant="white" :src="`${userImageURL}/${me.image}`" class="border border-primary" style="padding: 2px"></b-avatar>
					</template>
					<b-dd-header> {{ me.username }} </b-dd-header>
					<b-dropdown-item link-class="py-2" v-b-toggle.userProfile>Profile</b-dropdown-item>
					<b-dropdown-item link-class="py-2" to="/dashboard" v-if="isAdmin || isInstructor || isOwner">Dashboard</b-dropdown-item>
					<b-dropdown-item link-class="py-2" to="/my-courses" v-if="isStudent">My Courses</b-dropdown-item>
					<div class="py-2 px-3">
						<input type="range" min="0.5" max="1" step="0.001" v-model="brightness" />
					</div>
					<hr class="m-0" />
					<b-dropdown-item-btn variant="danger" @click="logout" button-class="py-2">
						<span class="pr-2">
							<b-icon icon="box-arrow-in-left" scale="1.5" />
						</span>
						Logout
					</b-dropdown-item-btn>
				</b-dropdown>
				<b-navbar-toggle target="nav-collapse" v-b-toggle.sidebar-backdrop></b-navbar-toggle>
			</div>

			<b-sidebar id="sidebar-backdrop" backdrop-variant="dark" backdrop shadow footer-class="d-flex justify-content-center p-2" body-class="px-3 pb-3">
				<template #header="{ hide }">
					<div class="w-100 d-flex justify-content-between align-items-center border-bottom pb-1">
						<b-navbar-brand to="/">
							<img :src="appLogo" class="d-inline-block align-top" alt="Academy" height="35" />
						</b-navbar-brand>
						<span @click="hide">&times;</span>
					</div>
				</template>

				<b-form class="w-100 pt-3">
					<b-input-group>
						<b-form-input placeholder="Search for courses" class="py-4"></b-form-input>
						<b-input-group-append>
							<b-button variant="primary">
								<b-icon icon="search" scale="0.8"></b-icon>
							</b-button>
						</b-input-group-append>
					</b-input-group>
				</b-form>

				<b-dropdown no-caret toggle-class="text-muted bg-transparent border-0 font-md px-0 py-3">
					<template #button-content>
						<i class="fas fa-th d-inline"></i>
						Courses
					</template>
					<b-dropdown-item href="#">EN</b-dropdown-item>
					<b-dropdown-item href="#">ES</b-dropdown-item>
					<b-dropdown-item href="#">RU</b-dropdown-item>
					<b-dropdown-item href="#">FA</b-dropdown-item>
				</b-dropdown>

				<div class="text-center" v-if="!isAuth">
					<b-btn variant="outline-dark" v-b-modal.loginModal class="mr-2">Sign In</b-btn>
					<b-btn variant="primary" v-b-modal.registerModal>Sign Up</b-btn>
				</div>
			</b-sidebar>

			<div class="w-100 d-none d-xl-flex">
				<b-dropdown no-caret toggle-class="text-muted bg-transparent border-0 font-md ml-5">
					<template #button-content>
						<i class="fas fa-th d-inline"></i>
						Courses
					</template>
					<b-dropdown-item href="#">EN</b-dropdown-item>
					<b-dropdown-item href="#">ES</b-dropdown-item>
					<b-dropdown-item href="#">RU</b-dropdown-item>
					<b-dropdown-item href="#">FA</b-dropdown-item>
				</b-dropdown>

				<!-- Right aligned nav items -->
				<div class="d-flex w-100 pl-xl-5 ml-xl-5">
					<b-form class="w-100">
						<b-input-group>
							<b-form-input placeholder="Search for courses" class="py-4"></b-form-input>
							<b-input-group-append>
								<b-button variant="primary">
									<b-icon icon="search" scale="0.8"></b-icon>
								</b-button>
							</b-input-group-append>
						</b-input-group>
					</b-form>

					<div class="ml-4 d-flex">
						<template v-if="!isAuth">
							<b-btn variant="outline-dark" class="mx-3 text-nowrap d-flex align-items-center" v-b-modal.loginModal>Sign In</b-btn>
							<b-btn variant="primary" class="text-nowrap d-flex align-items-center" v-b-modal.registerModal>Sign Up</b-btn>
						</template>
						<template v-else>
							<b-dropdown variant="link" toggle-class="text-decoration-none" no-caret right size="lg" lazy menu-class="py-0">
								<template #button-content>
									<div class="user">
										<img :src="`${userImageURL}/${me.image}`" alt="" />
									</div>
								</template>
								<b-dd-header> {{ me.username }} </b-dd-header>
								<b-dropdown-item link-class="py-2" v-b-toggle.userProfile>Profile</b-dropdown-item>
								<b-dropdown-item link-class="py-2" to="/dashboard" v-if="isAdmin || isInstructor || isOwner">Dashboard</b-dropdown-item>
								<b-dropdown-item link-class="py-2" to="/my-courses" v-if="isStudent">My Courses</b-dropdown-item>
								<div class="py-2 px-3">
									<input type="range" min="0.5" max="1" step="0.001" v-model="brightness" />
								</div>
								<hr class="m-0" />
								<b-dropdown-item-btn variant="danger" @click="logout" button-class="py-2">
									<span class="pr-2">
										<b-icon icon="box-arrow-in-left" scale="1.5" />
									</span>
									Logout
								</b-dropdown-item-btn>
							</b-dropdown>
						</template>
					</div>
				</div>
			</div>
		</b-container>
	</b-navbar>
</template>

<script>
	export default {
		computed: {
			brightness: {
				get: function () {
					return this.$store.state.appSettings.brightness;
				},
				set: function (v) {
					this.$store.commit("setBrightness", v);
				}
			}
		},

		methods: {
			logout() {
				this.$store.commit("Auth/logout");
				this.$router.go(0);
			}
		}
	};
</script>

<style lang="scss">
	.user {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		border: 1px solid var(--primary);
		overflow: hidden;
		cursor: pointer;
		margin: 0 10px;
		img {
			border-radius: 50%;
			width: 32px;
			height: 32px;
			object-fit: cover;
		}
	}
</style>
