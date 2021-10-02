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
					<div v-if="lecture.video">
						<video
							:src="`${lecturesURL}/${lecture.video}`"
							class="w-100"
							style="background-color: #000; min-height: 40vh; object-fit: fill"
							controls
							ref="video"
						></video>
					</div>
					<div class="course-details my-3 my-xl-30px">
						<div class="user-details d-flex align-items-center">
							<b-avatar v-if="course.createdBy" :src="`${userImageURL}/${course.createdBy.image}`"></b-avatar>
							<span class="font-weight-700 mx-3">{{ course.createdBy | relation("username") }}</span>
							<div class="ml-auto text-muted">{{ lecture.createdAt | date }}</div>
						</div>
						<div class="mx-md-50px pl-2 mt-3" v-html="lecture.description"></div>
						<SectionsContent class="d-xl-none mt-5" />
						<div class="lecture-quiz pt-3" v-if="lecture.quiz && lecture.quiz.questions && lecture.quiz.questions.length">
							<h3 class="mb-3" style="text-decoration: underline">Quiz :-</h3>
							<div class="questions ml-3">
								<ul class="questions-list pl-0 pl-xl-3" style="list-style: upper-latin">
									<li v-for="(question, i) in lecture.quiz.questions" :key="i" class="questions-item px-2 py-4">
										<Question :question="{ ...question, isAnswered: lecture.quiz.isAnswered }" :answers="answers" />
									</li>
								</ul>
								<b-overlay v-if="!lecture.quiz.isAnswered" :show="isLoading" rounded opacity="0.6" spinner-small spinner-variant="primary" class="d-inline-block">
									<b-btn :disabled="isLoading" variant="primary" @click="saveAnswers">Save</b-btn>
								</b-overlay>
							</div>
						</div>
					</div>
				</b-col>
				<b-col cols="4" class="d-none d-xl-block">
					<SectionsContent />
				</b-col>
			</b-row>
		</b-container>
	</div>
</template>

<script>
	import Question from "@/components/question/index.vue";

	import { QUESTION_COMPLETE, QUESTION_SPEECH } from "@/helpers/constants";
	import SectionsContent from "@/components/course/SectionsContent";

	export default {
		components: { Question, SectionsContent },

		data() {
			return {
				allExpanded: false,
				answers: []
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
			}
		},

		methods: {
			getCourse() {
				return this.$store.dispatch("Course/start", this.$route.params.courseId);
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

				this.setLoading(true);

				try {
					await this.$store.dispatch("Course/createAnswers", formData);
					await this.$store.dispatch("Course/quiz");
				} catch (err) {
					//
				}

				this.setLoading(false);
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
</style>
