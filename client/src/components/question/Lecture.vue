<template>
	<b-overlay :show="isLoading" rounded opacity="0.6" spinner-small spinner-variant="primary">
		<component :is="questions[question.type]" :question="question" @input="handleAnswer" :text-class="textClass">
			<template #iconStatus v-if="question.isCorrected">
				<b-icon icon="check" scale="2" variant="success" v-if="question.isTrue"></b-icon>
				<b-icon icon="x" scale="2" variant="danger" v-else></b-icon>
			</template>
		</component>
		<div class="text-center mt-3 h4" v-if="neededUserSubmit">
			<span v-b-hover="() => (isFillIcon = !isFillIcon)" @click="submit">
				<b-icon icon="check-circle-fill" class="c-pointer" variant="success" v-if="isFillIcon"></b-icon>
				<b-icon icon="check-circle" class="c-pointer" variant="success" v-else></b-icon>
			</span>
		</div>
	</b-overlay>
</template>

<script>
	const QuestionComplete = () => import("./complete.vue");
	const QuestionChoiceOne = () => import("./choiceOne.vue");
	const QuestionTrueOrFalse = () => import("./trueOrFalse.vue");
	const QuestionEssay = () => import("./essay.vue");
	const QuestionSpeech = () => import("./speech.vue");

	import { QUESTION_COMPLETE, QUESTION_CHOICE_ONE, QUESTION_TRUE_OR_FALSE, QUESTION_ESSAY, QUESTION_SPEECH } from "@/helpers/constants";

	export default {
		props: ["question", "quiz"],

		data() {
			return {
				questions: {
					[QUESTION_COMPLETE]: QuestionComplete,
					[QUESTION_CHOICE_ONE]: QuestionChoiceOne,
					[QUESTION_TRUE_OR_FALSE]: QuestionTrueOrFalse,
					[QUESTION_ESSAY]: QuestionEssay,
					[QUESTION_SPEECH]: QuestionSpeech
				},
				isFillIcon: false,
				answer: {},
				isLoading: false
			};
		},

		computed: {
			isSpeech() {
				return this.question.type === QUESTION_SPEECH;
			},

			isChoise() {
				return this.question.type === QUESTION_CHOICE_ONE;
			},

			isTrueOrFalse() {
				return this.question.type === QUESTION_TRUE_OR_FALSE;
			},

			neededUserSubmit() {
				return !this.isSpeech && !this.isChoise && !this.isTrueOrFalse;
			},

			textClass() {
				return this.question.isCorrected ? (this.question.isTrue ? " right" : " wrong") : "";
			}
		},

		methods: {
			handleAnswer(value) {
				this.answer = { value };

				if (this.isSpeech) {
					this.answer = new FormData();

					this.answer.set("value", value);
				}

				if (!this.neededUserSubmit) this.submit();
			},

			async submit() {
				if (!this.isValidAnswer()) return;

				this.isLoading = true;

				try {
					await this.$store.dispatch("Course/createAnswer", { answer: this.answer, questionId: this.question._id });
					await this.$store.dispatch("Course/quiz");
				} catch (err) {
					//
				}
				this.isLoading = false;
				this.isFillIcon = false;
			},

			isValidAnswer() {
				let value = this.answer.value;

				if (typeof value === "undefined" && !(this.answer instanceof FormData)) return false;

				if (this.question.type == QUESTION_COMPLETE) {
					let defaultAnswer = this.question.text.match(/\.\.+/gi);

					let questionNumber = this.quiz.questions.findIndex((question) => question._id.toString() == this.question._id.toString()) + 1;

					if (defaultAnswer.length != value.length) {
						let pronoun = defaultAnswer.length > 1 ? "are" : "is";

						this.setGlobalError(`Question No. ${questionNumber} has ${value.length} answers, but ${defaultAnswer.length} ${pronoun} required`);
						return false;
					}

					for (let i = 0; i < value.length; i++) {
						if (value[i] == "" || value[i] == null) {
							this.setGlobalError(`Answer number ${i + 1} in Question No. ${questionNumber} is required`);
							return false;
						}
					}
				}

				return true;
			}
		}
	};
</script>
