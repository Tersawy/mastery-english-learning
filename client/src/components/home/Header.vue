<template>
	<div>
		<div class="header overflow-hidden" :style="`background-image: url(${headerBg})`">
			<b-row class="h-100" align-v="center">
				<b-col cols="12" md="7" offset-md="1">
					<div class="home-banner-wrap px-3 text-white">
						<h2>Learn on your schedule</h2>
						<p>Study any topic, anytime. Explore thousands of courses for the lowest price ever!</p>
						<b-form>
							<b-input-group>
								<b-form-input placeholder="What do you want to learn ?" class="py-4 border-0 shadow-none"></b-form-input>
								<b-input-group-append>
									<b-button :class="`border${iconHovered ? '-danger bg-danger' : '-white bg-white'}`" v-b-hover="(v) => (iconHovered = v)">
										<b-icon icon="search" scale="1.2" :variant="iconHovered ? 'white' : 'danger'"></b-icon>
									</b-button>
								</b-input-group-append>
							</b-input-group>
						</b-form>
					</div>
				</b-col>
			</b-row>
		</div>
		<div class="home-fact-area text-white py-3">
			<b-container fluid class="px-xl-5">
				<b-row cols="1" cols-md="2" cols-lg="3">
					<b-col>
						<div class="d-flex align-items-center">
							<div class="display-4 mr-3">
								<i class="fas fa-bullseye"></i>
							</div>
							<div>
								<h4 class="font-weight-700 mb-0" style="font-size: 18px">3 Online courses</h4>
								<div class="font-md">Explore a variety of fresh topics</div>
							</div>
						</div>
					</b-col>
					<b-col>
						<div class="d-flex align-items-center mt-4 mt-md-0">
							<div class="display-4 mr-3">
								<i class="fas fa-check"></i>
							</div>
							<div>
								<h4 class="font-weight-700 mb-0" style="font-size: 18px">Expert instruction</h4>
								<div class="font-md">Find the right course for you</div>
							</div>
						</div>
					</b-col>
					<b-col md="12">
						<div class="d-flex align-items-center mt-4 mt-lg-0">
							<div class="display-4 mr-3">
								<i class="fas fa-clock"></i>
							</div>
							<div>
								<h4 class="font-weight-700 mb-0" style="font-size: 18px">Lifetime access</h4>
								<div class="font-md">Learn on your schedule</div>
							</div>
						</div>
					</b-col>
				</b-row>
			</b-container>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				iconHovered: false
			};
		},

		computed: {
			headerBg() {
				return `${this.API_URL}/settings-images/${this.$store.state.pages.home.headerBg}`;
			}
		}
	};
</script>

<style scoped lang="scss">
	.header {
		background-repeat: no-repeat;
		background-size: cover;
		width: 100%;
		height: calc(100vh - 65px - 99px);
		position: relative;
		&:before {
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgb(64, 98, 212);
			opacity: 0.3;
		}
		.home-banner-wrap {
			h2 {
				font-size: 44px;
				font-weight: 600;
				line-height: 1;
				margin-bottom: 10px;
			}
			p {
				font-size: 18px;
				line-height: 34px;
				margin-bottom: 30px;
				text-shadow: 0 2px 4px #29303b8c;
			}
		}
	}
	.home-fact-area {
		background-color: #ec5252;
		background: -webkit-linear-gradient(-45deg, #d254aa, #5c1546);
		background: -moz-linear-gradient(-45deg, #d254aa, 0, #5c1546 100%);
		background: -ms-linear-gradient(-45deg, #d254aa, 0, #5c1546 100%);
		background: -o-linear-gradient(-45deg, #d254aa, 0, #5c1546 100%);
		background: linear-gradient(-45deg, #d254aa, #5c1546);
	}
</style>
