<template>
	<div class="start-learning" v-if="course">
		<b-container fluid class="px-lg-4">
			<b-breadcrumb class="bg-white border rounded shadow-sm font-weight-600 my-30px">
				<b-breadcrumb-item to="/dashboard">
					<b-icon class="mr-1" icon="house-fill" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
					My Courses
				</b-breadcrumb-item>
				<b-breadcrumb-item active> {{ course.title }} </b-breadcrumb-item>
			</b-breadcrumb>
			<b-row>
				<b-col cols="8">
					<div style="" v-if="lecture.video">
						<video :src="`${lecturesURL}/${lecture.video}`" class="w-100" style="background-color: #000" controls ref="video"></video>
					</div>
					<div class="course-details my-30px">
						<div class="user-details d-flex align-items-center">
							<b-avatar v-if="course.createdBy" :src="`${userImageURL}/${course.createdBy.image}`"></b-avatar>
							<span class="font-weight-700 mx-3">{{ course.createdBy | relation("username") }}</span>
						</div>
						<div class="lecture-details ml-40px mt-2">
							<div class="mx-3 text-muted">{{ lecture.createdAt | date }}</div>
							<div class="mx-3 mt-3">
								{{ lecture.description }}
							</div>
						</div>
						<div class="lecture-quiz pt-3" v-if="lecture.quiz && lecture.quiz.questions && lecture.quiz.questions.length">
							<h3 class="mb-3" style="text-decoration: underline">Quiz :-</h3>
							<div class="questions ml-3">
								<ul class="questions-list" style="list-style: upper-latin">
									<li v-for="(question, i) in lecture.quiz.questions" :key="i" class="questions-item px-2 py-4">
										<Question :question="{ ...question, isAnswered: lecture.quiz.isAnswered }" :answers="answers" />
									</li>
								</ul>
								<b-overlay :show="isLoading" rounded opacity="0.6" spinner-small spinner-variant="primary" class="d-inline-block" @hidden="toggleLoading">
									<b-btn :disabled="isLoading" variant="primary" @click="saveAnswers" v-if="!lecture.quiz.isAnswered">Save</b-btn>
								</b-overlay>
							</div>
						</div>
					</div>
				</b-col>
				<b-col cols="4">
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
				</b-col>
			</b-row>
		</b-container>
	</div>
</template>

<script>
	import { secondsToHms } from "@/helpers/functions";

	import Question from "@/components/question/index.vue";

	import { QUESTION_COMPLETE, QUESTION_SPEECH } from "@/helpers/constants";

	export default {
		components: { Question },

		data() {
			return {
				allExpanded: false,
				isListen: false,
				answers: []
			};
		},

		async mounted() {
			await this.getCourse();

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

			lecturesCount() {
				return this.course?.sections?.reduce((total, section) => {
					total += section.lectures.length;
					return total;
				}, 0);
			},

			lecture() {
				return this.$store.state.Course.oneLecture;
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

			async showLectureVideo(lecture) {
				this.$store.commit("Course/setLecture", lecture);
				try {
					await this.$store.dispatch("Course/quiz");
				} catch (err) {
					//
				}
			},

			validateAnswers() {
				const answers = this.answers,
					questions = this.lecture.quiz.questions;

				for (let i = 0; i < questions.length; i++) {
					let question = questions[i];

					let answer = answers.find((a) => a.question == question._id);

					if (!answer) {
						this.setGlobalError(`Question No. ${i + 1} is required`);
						return false;
					}

					if (question.type == QUESTION_COMPLETE) {
						let defaultAnswerCount = question.text.match(/\.\.+/gi).length;

						if (defaultAnswerCount != answer.value.length) {
							let pronoun = defaultAnswerCount > 1 ? "are" : "is";

							this.setGlobalError(`Question No. ${i + 1} has ${answer.value.length} answers, but ${defaultAnswerCount} ${pronoun} required`);
							return false;
						}
					}
				}

				return true;
			},

			async saveAnswers() {
				if (!this.validateAnswers()) return;

				let formData = new FormData();

				this.answers.forEach((answer, i) => {
					if (answer.type == QUESTION_COMPLETE) {
						formData.set(`answers[${i}].question`, answer.question);
						answer.value.forEach((value, idx) => {
							formData.set(`answers[${i}].value[${idx}]`, value);
						});
					} else if (answer.type == QUESTION_SPEECH) {
						formData.set(`answers[${i}].${answer.question}`, answer.value);
					} else {
						formData.set(`answers[${i}].question`, answer.question);
						formData.set(`answers[${i}].value`, answer.value);
					}
				});

				this.toggleLoading();

				try {
					await this.$store.dispatch("Course/createAnswers", formData);
					await this.$store.dispatch("Course/quiz");
				} catch (err) {
					//
				}

				this.toggleLoading();
			}
		}
	};
</script>

<style lang="scss">
	.questions {
		.questions-list {
			.questions-item {
				&:nth-child(even) {
					background: rgb(237, 237, 237);
				}
				.question {
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					line-height: 2;
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
</style>
