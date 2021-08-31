<template>
	<b-card img-top tag="article" :class="`mb-2 course-card ${cardIsHovered ? 'hovered' : ''}`" header-class="p-0" v-b-hover="handleCardHover">
		<template #header>
			<b-card-img :src="require('@/assets/images/course.jpg')"> </b-card-img>
		</template>
		<b-card-title>
			<h5 class="mb-0">Card Title</h5>
		</b-card-title>
		<span class="text-muted font-md"> Some quick example text to build on the card title and make up the bulk of the card's content. </span>
	</b-card>
</template>

<script>
	export default {
		data() {
			return {
				cardIsHovered: false
			};
		},

		methods: {
			handleCardHover(v) {
				this.cardIsHovered = v;
			}
		}
	};
</script>

<style lang="scss" scoped>
	.course-card {
		transition: 0.1s all ease-in-out;
		.card-header {
			position: relative;
			&::before {
				transition: 0.1s all ease-in-out;
				content: "";
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background-color: #000;
				opacity: 0;
			}
		}
		&.hovered {
			box-shadow: 0 0.5rem 1rem #00000026 !important;
			cursor: pointer;
			.card-header {
				&::before {
					opacity: 0.2;
				}
			}
		}
	}
</style>
