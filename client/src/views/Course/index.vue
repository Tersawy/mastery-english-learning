<template>
	<div>
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
							<SectionsContent :showVideoInModal="true" />
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
									<div v-if="!isAuth || isStudent">
										<b-btn class="btn-enroll enrolled" v-if="course.isEnrolled" :to="`/courses/${course._id}/start`">
											<b-icon icon="check2-circle"></b-icon>
											<span> Start Learning now </span>
										</b-btn>
										<b-btn @click="enroll" class="btn-enroll" v-else>Enroll</b-btn>
									</div>
									<b-btn class="btn-enroll" disabled v-else>Enroll</b-btn>
								</div>
							</div>
						</div>
					</b-col>
				</b-row>
			</b-container>
		</div>
		<LectureVideo />
		<LoginModal @signedIn="signedIn" />
		<RegisterModal />
		<Congrats v-if="isCongrate" />
	</div>
</template>

<script>
	import Congrats from "@/components/Congrats.vue";
	import LectureVideo from "@/components/dashboard/course/LectureVideo.vue";
	import LoginModal from "@/components/auth/LoginModal.vue";
	import RegisterModal from "@/components/auth/RegisterModal.vue";
	import SectionsContent from "@/components/course/SectionsContent.vue";
	export default {
		components: { LectureVideo, LoginModal, RegisterModal, Congrats, SectionsContent },
		data() {
			return {
				isCongrate: false
			};
		},

		async mounted() {
			await this.getCourse();

			this.$store.commit("setLoader", false);
		},

		computed: {
			course() {
				return this.$store.state.Course.one;
			}
		},

		methods: {
			getCourse() {
				return this.$store.dispatch("Course/show", this.$route.params.courseId);
			},

			async enroll() {
				if (!this.isAuth) return this.$bvModal.show("loginModal");

				try {
					await this.$store.dispatch("Student/enroll", this.course);

					this.$store.commit("Course/setOne", { ...this.course, isEnrolled: true });

					this.$swal
						.fire({
							title: "Congratulations on the new course",
							icon: "success",
							confirmButtonText: "Start to learning"
						})
						.then((result) => {
							if (result.isConfirmed) {
								this.$router.push({ name: "StartCourse", params: { courseId: this.$route.params.courseId } });
							}
						});

					this.isCongrate = true;

					setTimeout(() => (this.isCongrate = false), 5000);
				} catch (err) {
					//
				}
			},

			async signedIn() {
				this.$store.commit("setLoader", true);
				await this.getCourse();
				this.$store.commit("setLoader", false);
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
					background: transparent;
					border-color: #505763;
					color: #686f7a;
					&:hover:not(:disabled),
					&:focus:not(:disabled) {
						background-color: #f2f3f5;
					}
					&:disabled {
						background-color: #f2f3f5;
						cursor: not-allowed;
					}
					&.enrolled {
						background-color: transparent;
						color: var(--success);
						border-color: var(--success);
					}
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
