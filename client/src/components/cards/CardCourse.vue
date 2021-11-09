<template>
	<b-card tag="article" :body-class="`p-0 ${imgTop ? '' : 'p-md-3'}`" :class="`mb-2 course-card ${cardIsHovered ? 'hovered' : ''}`" v-b-hover="handleCardHover">
		<b-row>
			<b-col cols="12" :md="imgTop ? '12' : '4'">
				<b-card-img @click="showCourse(course)" class="c-pointer" style="height: 250px" :src="`${thumbnailsURL}/${course.thumbnail}`"> </b-card-img>
			</b-col>
			<b-col :class="`${imgTop ? '' : 'mt-4 mt-md-0'}`">
				<div :class="`p-3 ${imgTop ? '' : 'p-md-0'} d-flex flex-column h-100`">
					<div style="letter-spacing: 0.7px">
						<h6 class="font-weight-bold">{{ course.title }}</h6>
					</div>

					<div class="text-muted mt-3" style="font-size: 12px" v-if="description">{{ course.short_description }}</div>

					<div class="mt-3" :style="{ fontSize: '12px' }">
						<b-row cols-xl="2">
							<b-col class="py-1 text-nowrap">
								<strong :style="{ letterSpacing: '0.7px' }">Updated</strong>
								<strong class="text-primary" :style="{ opacity: 0.7 }">
									{{ course.updatedAt | date }}
								</strong>
							</b-col>
							<b-col class="py-1 text-nowrap">
								<strong :style="{ letterSpacing: '0.7px' }">total time: </strong>
								<strong class="text-primary" :style="{ opacity: 0.7 }">
									{{ courseHours }}
								</strong>
							</b-col>
							<b-col class="py-1 text-nowrap">
								<strong :style="{ letterSpacing: '0.7px' }">level: </strong>
								<strong class="text-primary" :style="{ opacity: 0.7 }">
									{{ course.level | relation("name") }}
								</strong>
							</b-col>
							<b-col class="py-1 text-nowrap">
								<strong :style="{ letterSpacing: '0.7px' }">lectures: </strong>
								<strong class="text-primary" :style="{ opacity: 0.7 }">
									{{ course.lecturesCount }}
								</strong>
							</b-col>
						</b-row>
					</div>

					<div class="my-3">
						<span class="text-muted">By: </span>
						<router-link to="/">{{ course.instructor | relation("username") }}</router-link>
					</div>
					<ButtonStartLearn class="mt-auto" :course="course" />
				</div>
			</b-col>
		</b-row>
	</b-card>
</template>

<script>
	import { secondsToHms } from "@/helpers/functions";
	import ButtonStartLearn from "@/components/buttons/ButtonStartLearn.vue";

	export default {
		components: { ButtonStartLearn },
		props: {
			course: {
				type: Object,
				required: true
			},
			imgTop: {
				type: Boolean,
				default: () => false
			},
			description: {
				type: Boolean,
				default: () => true
			}
		},
		data() {
			return {
				cardIsHovered: false
			};
		},

		computed: {
			courseHours() {
				return secondsToHms(this.course.time).timeStr || "00:00:00";
			}
		},

		methods: {
			handleCardHover(v) {
				this.cardIsHovered = v;
			},

			showCourse(course) {
				this.$router.push(`/courses/${course._id}`);
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
			box-shadow: 0.2rem 0.2rem 0.7rem #00000026 !important;
			transform: scale(1.003);
			.card-header {
				&::before {
					opacity: 0.05;
				}
			}
		}
	}
</style>
