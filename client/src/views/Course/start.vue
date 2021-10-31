<template>
	<div class="start-learning" v-if="course">
		<b-container fluid class="px-lg-4">
			<b-breadcrumb class="bg-white border rounded shadow-sm font-weight-600 my-30px d-none d-sm-flex">
				<b-breadcrumb-item to="/dashboard">
					<b-icon class="mr-1" icon="house-fill" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
					My Courses
				</b-breadcrumb-item>
				<b-breadcrumb-item active> {{ course.title }} </b-breadcrumb-item>
			</b-breadcrumb>
			<b-row class="mt-3 mt-sm-0">
				<b-col cols="12" xl="8">
					<template v-if="!isSectionQuiz">
						<div v-if="lecture.video">
							<video :src="`${lecturesURL}/${lecture.video}`" class="video-start" controls ref="video"></video>
						</div>
						<div class="course-details my-3 my-xl-30px">
							<div class="user-details d-flex align-items-center">
								<b-avatar v-if="course.createdBy" :src="`${userImageURL}/${course.createdBy.image}`"></b-avatar>
								<span class="font-weight-700 mx-3">{{ course.createdBy | relation("username") }}</span>
								<div class="ml-auto text-muted">{{ lecture.createdAt | date }}</div>
							</div>
							<div class="mx-md-50px pl-2 mt-3" v-html="lecture.description"></div>
							<SectionsContent
								@renderLectureVideo="() => (isSectionQuiz = false)"
								@sectionQuizLoaded="showSectionQuiz"
								:show-section-quiz="true"
								class="d-xl-none mt-5"
							/>
							<div class="lecture-quiz mt-5" v-if="lecture.quiz && lecture.quiz.questions && lecture.quiz.questions.length">
								<h3 class="mb-3" style="text-decoration: underline">Quiz :-</h3>
								<div class="questions ml-3">
									<ul class="questions-list pl-0 pl-xl-3">
										<li v-for="(question, i) in lecture.quiz.questions" :key="i" class="questions-item">
											<Question :question="{ ...question }" :quiz="lecture.quiz" class="px-2 py-4 question-overlay" />
										</li>
									</ul>
								</div>
							</div>
						</div>
					</template>
					<template v-else>
						<SectionQuiz @startNextSection="startNextSection" />
					</template>
				</b-col>
				<b-col cols="4" class="d-none d-xl-block">
					<SectionsContent @renderLectureVideo="() => (isSectionQuiz = false)" @sectionQuizLoaded="showSectionQuiz" :show-section-quiz="true" />
				</b-col>
			</b-row>
		</b-container>
	</div>
</template>

<script>
	import Question from "@/components/question/Lecture.vue";

	import SectionsContent from "@/components/course/SectionsContent";
	import SectionQuiz from "@/components/course/SectionQuiz";

	export default {
		components: { Question, SectionsContent, SectionQuiz },

		data() {
			return {
				allExpanded: false,
				answers: [],
				isSectionQuiz: false
			};
		},

		async mounted() {
			await this.getCourse();

			this.$store.commit("setLoader", false);

			for (let i = 0; i < this.course.sections.length; i++) {
				if (!this.course.sections[i].lectures.length) continue;

				for (let l = 0; l < this.course.sections[i].lectures.length; l++) {
					if (this.course.sections[i].lectures[l]) {
						this.showLectureVideo(this.course.sections[i].lectures[l]);
						break;
					}
				}

				if (Object.keys(this.lecture).length) break;
			}
		},

		computed: {
			course() {
				return this.$store.state.Course.one;
			},

			lecture() {
				return this.$store.state.Course.oneLecture;
			},

			section() {
				return this.$store.state.Course.oneSection;
			}
		},

		methods: {
			getCourse() {
				return this.$store.dispatch("Course/start", this.$route.params.courseId);
			},

			async showLectureVideo(lecture) {
				this.isSectionQuiz = false;

				this.$store.commit("Course/setLecture", lecture);

				try {
					await this.$store.dispatch("Course/quiz");
				} catch (err) {
					//
				}
			},

			showSectionQuiz() {
				if (this.section.quiz.questions.length) {
					this.isSectionQuiz = true;
				}
			},

			startNextSection() {
				let currentSectionIndex = this.course.sections.findIndex((section) => section._id == this.section._id);

				if (currentSectionIndex < 0) return;

				let nextSections = this.course.sections.slice(currentSectionIndex + 1);

				for (let i = 0; i < nextSections.length; i++) {
					if (!nextSections[i].lectures.length) continue;

					nextSections[i].lecturesVisible = true;

					for (let l = 0; l < nextSections[i].lectures.length; l++) {
						if (nextSections[i].lectures[l]) {
							this.showLectureVideo(nextSections[i].lectures[l]);
							break;
						}
					}

					if (Object.keys(this.lecture).length) break;
				}
			}
		}
	};
</script>

<style lang="scss">
	.start-learning {
		.video-start {
			width: 100%;
			background-color: #000;
			min-height: 40vh;
			object-fit: fill;
		}
		.questions {
			.questions-list {
				list-style: decimal;
				li.questions-item {
					&:nth-child(even) {
						.question-overlay {
							background: rgb(237, 237, 237);
						}
					}
					.question {
						display: flex;
						align-items: center;
						flex-wrap: wrap;
						line-height: 2;
						.question-text {
							color: var(--primary);
							letter-spacing: 0.7px;
							&.right {
								color: var(--success);
								font-weight: 600;
							}
							&.wrong {
								color: var(--danger);
								font-weight: 600;
							}
						}
						input.input-complete {
							height: 18px;
							width: 64px;
							border: none;
							outline: none;
							background-color: #e9e4a1;
							margin: 0 3px;
							&:focus-visible,
							&:focus {
								border: none;
								outline: none;
							}
						}
						&.question-true-or-false {
							line-height: 2 !important;
						}
						&.question-speech {
							.ar-icon {
								line-height: 1.5;
							}
							.ar-records {
								.ar__rm {
									line-height: 0;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
