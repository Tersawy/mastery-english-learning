<template>
	<div class="questions">
		<b-card body-class="text-center shadow rounded-lg">
			<b-badge class="font-md mr-2" variant="outline-primary">
				<b-icon icon="file-earmark-spreadsheet" scale="0.9"></b-icon>
				Quiz Section
			</b-badge>
			<span class="font-weight-600" style="letter-spacing: 0.7px">{{ section.title }}</span>
		</b-card>

		<b-row>
			<b-col cols="12" sm="8" offset-sm="2">
				<b-card v-if="isAnswered" class="mt-4 shadow" body-class="d-flex align-items-center flex-column">
					<radial-progress-bar
						:diameter="100"
						:completedSteps="section.quiz.passRate"
						innerStrokeColor="#ccc"
						startColor="#d254aa"
						stopColor="#d254aa"
						:total-steps="100"
						:strokeWidth="10"
						:innerStrokeWidth="8"
					>
						<span class="h3 mb-0">{{ section.quiz.passRate }}%</span>
					</radial-progress-bar>
					<!-- <h3 class="mt-4">Please Wait ...</h3> -->
					<h3 class="mt-4 font-weight-600">Pass Rate</h3>
				</b-card>
			</b-col>
		</b-row>

		<ul class="questions-list pl-3 pl-xl-3 mt-4">
			<li v-for="(question, i) in section.quiz.questions" :key="i" class="questions-item">
				<Question :disabled="isPassedQuiz" :answers="answers" :question="{ ...question }" class="px-2 py-4 question-overlay" />
			</li>
		</ul>
		<b-overlay v-if="!isPassedQuiz" :show="isLoading" rounded opacity="0.6" spinner-small spinner-variant="primary" class="d-inline-block">
			<b-btn :disabled="isLoading" variant="primary" @click="saveAnswers" class="mb-4">Save</b-btn>
		</b-overlay>

		<b-modal id="modalProgress" no-close-on-backdrop hide-header hide-footer centered body-class="p-0">
			<div class="d-flex align-items-center flex-column p-5">
				<radial-progress-bar
					:diameter="200"
					:completedSteps="quizProgress.completedSteps"
					innerStrokeColor="#ccc"
					startColor="#d254aa"
					stopColor="#d254aa"
					:animateSpeed="200"
					:total-steps="100"
					:strokeWidth="12"
					:innerStrokeWidth="10"
				>
					<span class="display-4">{{ quizProgress.completedSteps }}%</span>
				</radial-progress-bar>
				<!-- <h3 class="mt-4">Please Wait ...</h3> -->
				<h3 class="mt-4 font-weight-600">Pass Rate</h3>
			</div>
		</b-modal>

		<Congrats v-if="isCongrate" />
	</div>
</template>

<script>
	const Question = () => import("@/components/question/Section.vue");

	import { sweetAlert } from "@/components/utils";

	import RadialProgressBar from "vue-radial-progress";

	import { QUESTION_COMPLETE, QUESTION_SPEECH } from "@/helpers/constants";

	const Congrats = () => import("@/components/Congrats.vue");

	export default {
		components: { Question, RadialProgressBar, Congrats },

		data() {
			return {
				answers: [],
				isCongrate: false,
				quizProgress: {
					completedSteps: 0
				}
			};
		},

		mounted() {
			if (this.isAnswered) {
				this.answers = this.section.quiz.questions.reduce((prev, current) => {
					return [...prev, { question: current._id, value: current.answer }];
				}, []);
			}
		},

		computed: {
			section() {
				return this.$store.state.Course.oneSection;
			},

			isAnswered() {
				return this.section.quiz.passRate >= 0;
			},

			isPassedQuiz() {
				return this.section.quiz.passRate >= 50;
			}
		},

		methods: {
			validateAnswers() {
				const answers = this.answers,
					questions = this.section.quiz.questions;
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
					let res = await this.$store.dispatch("Course/createSectionAnswers", formData);

					await this.$store.dispatch("Course/start", this.$store.state.Course.one._id);

					await this.$store.dispatch("Course/sectionQuiz");

					this.handleAnswersResponse(res);
				} catch (err) {
					//
				}
				this.setLoading(false);
			},

			handleAnswersResponse(res) {
				this.$bvModal.show("modalProgress");

				let interval = setInterval(() => {
					if (this.quizProgress.completedSteps == res.passRate) {
						clearInterval(interval);

						setTimeout(() => {
							this.$bvModal.hide("modalProgress");

							if (res.passRate >= 50) {
								this.passedQuiz();
							} else {
								this.failedQuiz();
							}

							this.resetProgress();
						}, 500);
					} else {
						this.quizProgress.completedSteps++;
					}
				}, 20);
			},

			resetProgress() {
				setTimeout(() => {
					this.quizProgress.completedSteps = 0;
				}, 500);
			},

			passedQuiz() {
				this.isCongrate = true;

				setTimeout(() => (this.isCongrate = false), 5000);

				sweetAlert({
					title: "Congratulations, you passed the Quiz",
					width: "38rem",
					imageWidth: 300,
					imageUrl: this.API_URL + "/icons/emoticon-smile.png",
					confirmButtonText: "Lets go"
				}).then((result) => {
					if (result.isConfirmed) {
						this.$emit("startNextSection");
					}
				});
			},

			failedQuiz() {
				sweetAlert({
					title: "Sorry,",
					text: "You didn't pass the Quiz, please watch the videos again and try again later",
					width: "38rem",
					imageWidth: 300,
					imageUrl: this.API_URL + "/icons/emoticon-sad2.png",
					confirmButtonText: "Close",
					customClass: {
						title: "text-danger",
						confirmButton: "btn btn-primary btn-lg"
					}
				});
			}
		}
	};
</script>

<style lang="scss" scoped></style>
