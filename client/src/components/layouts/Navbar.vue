<template>
	<b-navbar toggleable="xl" variant="light" style="height: 65px">
		<b-container fluid>
			<b-navbar-brand href="#">
				<img :src="require('@/assets/images/logo-dark.png')" class="d-inline-block align-top" alt="Academy" height="35" />
			</b-navbar-brand>

			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

			<b-collapse id="nav-collapse" is-nav>
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
								<b-button variant="danger">
									<b-icon icon="search" scale="0.8"></b-icon>
								</b-button>
							</b-input-group-append>
						</b-input-group>
					</b-form>

					<div class="ml-4 d-flex">
						<template v-if="!isAuth">
							<b-btn variant="outline-dark" class="mx-3 text-nowrap d-flex align-items-center" to="/login">Sign In</b-btn>
							<b-btn variant="danger" class="text-nowrap d-flex align-items-center" to="/register">Sign Up</b-btn>
						</template>
						<template v-else>
							<b-dropdown variant="link" toggle-class="text-decoration-none" no-caret right size="lg" lazy menu-class="py-0">
								<template #button-content>
									<div class="user">
										<img :src="require('@/assets/images/user6.jpg')" alt="" />
									</div>
								</template>
								<b-dd-header> {{ me.username }} </b-dd-header>
								<b-dropdown-item link-class="py-2" href="#">Profile</b-dropdown-item>
								<b-dropdown-item link-class="py-2" to="/dashboard" v-if="isAdmin || isInstructor">Dashboard</b-dropdown-item>
								<b-dropdown-item link-class="py-2" to="/dashboard" v-if="isStudent">My Courses</b-dropdown-item>
								<hr class="m-0" />
								<b-dropdown-item-btn variant="danger" @click="$store.commit('Auth/logout')" button-class="py-2">
									<span class="pr-2">
										<b-icon icon="box-arrow-in-left" scale="1.5" />
									</span>
									Logout
								</b-dropdown-item-btn>
							</b-dropdown>
						</template>
					</div>
				</div>
			</b-collapse>
		</b-container>
	</b-navbar>
</template>

<style scoped></style>
