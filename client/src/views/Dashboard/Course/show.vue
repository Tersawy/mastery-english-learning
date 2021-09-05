<template>
	<div>
		<b-breadcrumb class="bg-white border rounded shadow-sm font-weight-600 mb-30px">
			<b-breadcrumb-item to="/dashboard">
				<b-icon class="mr-1" icon="house-fill" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
				Dashboard
			</b-breadcrumb-item>
			<b-breadcrumb-item to="/dashboard/courses"> Courses </b-breadcrumb-item>
			<b-breadcrumb-item active> {{ course.title }} </b-breadcrumb-item>
		</b-breadcrumb>

		<div class="course-header-area" v-if="course">
			<b-container fluid="lg">
				<b-row>
					<b-col lg="8">
						<div class="course-header-wrap">
							<h1 class="title d-none d-lg-block">{{ course.title }}</h1>
							<h3 class="title d-lg-none">{{ course.title }}</h3>
							<p class="subtitle">{{ course.short_description }}</p>
							<div class="rating-row">
								<span class="course-badge best-seller">beginner</span>
								<span class="enrolled-num"> {{ course.studentsCount }} Students enrolled </span>
							</div>
							<div class="created-row">
								<span class="last-updated-date">Last updated {{ course.updatedAt | date }}</span>
								<span class="comment">
									<i class="fas fa-comment" aria-hidden="true"></i>
									<span>&nbsp;arabic</span>
								</span>
							</div>
						</div>
					</b-col>
				</b-row>
			</b-container>
		</div>
		<div class="course-content-area py-5">
			<b-container fluid="lg">
				<b-row>
					<b-col lg="8">
						<div class="course-content pb-4">
							<h4 class="mb-3 font-weight-700">Course content</h4>
							<div class="d-flex align-items-center justify-content-between mb-2">
								<p class="mb-0 font-md">
									{{ +course.sections.length }} sections • {{ lecturesCount }} lectures •
									{{ lecturesTime(course.time).timeStr }}
									total length
								</p>
								<b-btn size="sm" variant="teal" @click="expandAll">
									<span v-if="allExpanded"> Collapse All </span>
									<span v-else> Expand All </span>
								</b-btn>
							</div>
							<div class="course-content-sections">
								<b-card no-body v-for="(section, i) in course.sections" :key="i">
									<b-card-body @click="section.lecturesVisible = !section.lecturesVisible" class="p-3 d-flex justify-content-between c-pointer">
										<div class="d-flex align-items-center">
											<b-icon :icon="`chevron-${section.lecturesVisible ? 'up' : 'down'}`" />
											<span class="mx-2 font-weight-600">{{ section.title }}</span>
										</div>
										<span class="font-md"> {{ section.lectures.length }} lectures • {{ lecturesTime(section.time).timeStr }} </span>
									</b-card-body>
									<b-collapse v-model="section.lecturesVisible">
										<b-card-footer class="p-0 border-0">
											<div class="d-flex align-items-center justify-content-between p-3 font-md" v-for="(lecture, i) in section.lectures" :key="i">
												<div>
													<span style="font-size: 18px" class="">
														<b-icon
															icon="caret-right-fill"
															variant="white"
															class="rounded-circle bg-dark p-1 c-pointer"
															v-if="lecture.video"
															@click="showLectureVideo(lecture)"
														/>
														<b-icon icon="dash-circle" scale="2" variant="white" class="rounded-circle bg-dark p-1" v-else />
													</span>
													<span class="mx-2 text-primary c-pointer" style="text-decoration: underline" @click="showLectureVideo(lecture)" v-if="lecture.video">
														{{ lecture.title }}
													</span>
													<span class="mx-2" v-else>{{ lecture.title }}</span>
													<b-icon
														:icon="`chevron-${lecture.descriptionVisible ? 'up' : 'down'}`"
														variant="dark"
														class="c-pointer"
														@click="lecture.descriptionVisible = !lecture.descriptionVisible"
													/>
													<b-collapse v-model="lecture.descriptionVisible">
														<p class="text-muted pl-4 mt-1 mb-0 font-md">{{ lecture.description }}</p>
													</b-collapse>
												</div>
												<div>{{ lecturesTime(lecture.time).timeNum }}</div>
											</div>
										</b-card-footer>
									</b-collapse>
								</b-card>
							</div>
						</div>
						<div class="course-requirments py-4">
							<h4 class="mb-3 font-weight-700">Requirements</h4>
							<div class="requirments-content font-md">
								<ul>
									<li v-for="(requirement, i) in course.requirements" :key="i">
										{{ requirement }}
									</li>
								</ul>
							</div>
						</div>
						<div class="course-description py-4">
							<h4 class="mb-3 font-weight-700">Description</h4>
							<div class="description-content font-md" v-html="course.description"></div>
						</div>
					</b-col>
					<b-col lg="4">
						<div class="course-sidebar natural">
							<div class="preview-video-box">
								<img v-if="course.thumbnail" :src="`${thumbnailsURL}/${course.thumbnail}`" class="img-fluid w-100" />
							</div>
							<div class="course-sidebar-text-box">
								<div class="buy-btns">
									<b-btn class="btn-enroll" disabled>Enroll</b-btn>
								</div>
							</div>
						</div>
					</b-col>
				</b-row>
			</b-container>
		</div>
		<LectureVideo />
	</div>
</template>

<script>
	import { secondsToHms } from "@/helpers/functions";
	import LectureVideo from "@/components/dashboard/course/LectureVideo.vue";
	export default {
		components: { LectureVideo },
		data() {
			return {
				allExpanded: false
			};
		},

		mounted() {
			this.getCourse();
		},

		computed: {
			course() {
				return this.$store.state.Course.one;
			},

			lecturesCount() {
				return this.course?.sections?.reduce((total, section) => {
					total += section.lectures.length;
					return total;
				}, 0);
			}
		},

		watch: {
			allExpanded(v) {
				this.course?.sections?.forEach((section) => {
					section.lecturesVisible = v;
					if (!v) {
						section.lectures.forEach((lecture) => {
							lecture.descriptionVisible = v;
						});
					}
				});
			}
		},

		methods: {
			getCourse() {
				return this.$store.dispatch("Course/show", this.$route.params.courseId);
			},

			expandAll() {
				this.allExpanded = !this.allExpanded;
			},

			lecturesTime(time) {
				return secondsToHms(time);
			},

			showLectureVideo(lecture) {
				this.$store.commit("Course/setLecture", lecture);
				this.$bvModal.show("lectureVideo");
			}
		}
	};
</script>

<style lang="scss" scoped>
	.course-header-area {
		background-color: #29303b;
		color: #fff;
		padding: 60px 0;
		.course-header-wrap {
			.course-badge {
				color: #29303b;
				box-shadow: 0 0 1px 1px #14171c1a, 0 3px 1px 0 #14171c1a;
				pointer-events: none;
				border-radius: 3px;
				font-size: 9px;
				padding: 1px 8px;
				font-weight: 700;
				position: relative;
				line-height: 1.5;
				text-align: center;
				text-transform: uppercase;
				display: inline-block;
				&:after {
					border-radius: 3px;
					right: -4px;
					background: inherit;
					content: "";
					height: 11px;
					position: absolute;
					top: 2px;
					transform: rotate(45deg);
					width: 11px;
					z-index: 0;
					display: block;
				}
				.title {
					font-size: 36px;
					line-height: 41px;
					font-weight: 600;
					margin-bottom: 10.5px;
				}
				.subtitle {
					font-size: 21px;
					line-height: 27px;
					margin-bottom: 7px;
				}
				&.best-seller {
					background: #f4c150;
				}
			}
			& > div > span {
				margin-right: 12px;
				margin-bottom: 7px;
				font-size: 15px;
			}
		}
	}
	.course-sidebar {
		background-color: #fff;
		box-shadow: 0 0 1px 1px #14171c1a, 0 3px 1px 0 #14171c1a;
		border-radius: 4px;
		color: #505763;
		padding: 3px;
		position: relative;
		z-index: 10;
		@media (min-width: 991px) {
			margin-top: -300px;
		}
		.course-sidebar-text-box {
			padding: 15px 30px;
			.buy-btns {
				.btn {
					display: block;
					width: 100%;
					margin: 0;
					border-radius: 2px;
					margin-top: 13px;
					padding: 15px 12px;
					font-size: 15px;
					font-weight: 600;
					margin-bottom: 10px;
				}
				.btn-enroll {
					border-color: #505763;
					color: #686f7a;
					background-color: #f2f3f5;
					cursor: not-allowed;
				}
			}
		}
	}

	// lecturesTime(time) {
	// return secondsToHms(time);
	// let total_hours = 0,
	// 	total_minutes = 0,
	// 	total_seconds = 0;
	// this.course?.sections?.forEach((section) => {
	// 	let section_hours = 0,
	// 		section_minutes = 0,
	// 		section_seconds = 0;
	// 	section.lectures.forEach((lecture) => {
	// 		let [h, m, s] = lecture.time.split(":");

	// 		if (typeof s == "undefined") {
	// 			total_minutes += +h;
	// 			total_seconds += +m;
	// 			section_minutes += +h;
	// 			section_seconds += +m;
	// 		} else {
	// 			total_hours += +h;
	// 			total_minutes += +m;
	// 			total_seconds += +s;
	// 			section_hours += +h;
	// 			section_minutes += +m;
	// 			section_seconds = +s;
	// 		}
	// 	});
	// 	if (section_seconds > 59) {
	// 		section_minutes += parseInt(section_seconds / 60);
	// 	}
	// 	if (section_minutes > 59) {
	// 		section_hours += parseInt(section_minutes / 60);
	// 		section_minutes = section_minutes % 60;
	// 	}

	// 	section.totalTime = section_hours ? `${section_hours}h ` : "";
	// 	section.totalTime += section_minutes ? `${section_minutes}min ` : "";
	// });

	// if (total_seconds > 59) {
	// 	total_minutes += parseInt(total_seconds / 60);
	// }
	// if (total_minutes > 59) {
	// 	total_hours += parseInt(total_minutes / 60);
	// 	total_minutes = total_minutes % 60;
	// }

	// let totalTime = total_hours ? `${total_hours}h ` : "";
	// totalTime += total_minutes ? `${total_minutes}min ` : "";

	// return totalTime;
	// }
</style>
