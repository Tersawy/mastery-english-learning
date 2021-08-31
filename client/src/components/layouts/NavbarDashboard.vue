<template>
	<div class="topbar px-2 shadow-sm">
		<div class="d-flex align-items-center pl-3">
			<b-navbar-brand href="#">
				<img :src="require('@/assets/images/logo-dark.png')" class="d-inline-block align-top" alt="Academy" height="35" />
			</b-navbar-brand>
			<div class="toggle d-flex d-lg-none" @click="toggleMenu">
				<b-icon icon="menu-button-wide" scale="1.3"></b-icon>
			</div>
		</div>
		<div class="content">
			<b-dropdown variant="link" toggle-class="text-decoration-none" no-caret right size="lg" lazy menu-class="py-0">
				<template #button-content>
					<div class="user">
						<img :src="require('@/assets/images/user6.jpg')" alt="" />
					</div>
				</template>
				<b-dd-header> {{ me.username }} </b-dd-header>
				<b-dropdown-item link-class="py-2" href="#">Profile</b-dropdown-item>
				<hr class="m-0" />
				<b-dropdown-item-btn variant="danger" @click="$store.commit('Auth/logout')" button-class="py-2">
					<span class="pr-2">
						<b-icon icon="box-arrow-in-left" scale="1.5" />
					</span>
					Logout
				</b-dropdown-item-btn>
			</b-dropdown>
		</div>
	</div>
</template>

<script>
	export default {
		methods: {
			toggleMenu() {
				this.$emit("toggleSidebar");
			}
		}
	};
</script>

<style scoped lang="scss">
	.topbar {
		width: 100%;
		background: #fff;
		height: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.toggle {
			position: relative;
			width: 60px;
			height: 60px;
			cursor: pointer;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		// .content {
		// 	.user {
		// 		position: relative;
		// 		display: flex;
		// 		align-items: center;
		// 		justify-content: center;
		// 		width: 40px;
		// 		height: 40px;
		// 		border-radius: 50%;
		// 		border: 1px solid var(--primary);
		// 		overflow: hidden;
		// 		cursor: pointer;
		// 		margin: 0 10px;
		// 		img {
		// 			border-radius: 50%;
		// 			width: 32px;
		// 			height: 32px;
		// 			object-fit: cover;
		// 		}
		// 	}
		// }
	}
</style>

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
