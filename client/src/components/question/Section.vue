<template>
	<component :disabled="disabled" :is="questions[question.type]" :question="question" @input="handleAnswer"> </component>
</template>

<script>
	const QuestionComplete = () => import("./complete.vue");
	const QuestionChoiceOne = () => import("./choiceOne.vue");
	const QuestionTrueOrFalse = () => import("./trueOrFalse.vue");
	const QuestionEssay = () => import("./essay.vue");
	const QuestionSpeech = () => import("./speech.vue");

	import { QUESTION_COMPLETE, QUESTION_CHOICE_ONE, QUESTION_TRUE_OR_FALSE, QUESTION_ESSAY, QUESTION_SPEECH } from "@/helpers/constants";

	export default {
		props: ["question", "answers", "disabled"],

		data() {
			return {
				questions: {
					[QUESTION_COMPLETE]: QuestionComplete,
					[QUESTION_CHOICE_ONE]: QuestionChoiceOne,
					[QUESTION_TRUE_OR_FALSE]: QuestionTrueOrFalse,
					[QUESTION_ESSAY]: QuestionEssay,
					[QUESTION_SPEECH]: QuestionSpeech
				}
			};
		},

		methods: {
			handleAnswer(value) {
				let index = this.answers.findIndex((answer) => answer.question == this.question._id);
				let answer = { question: this.question._id, type: this.question.type, value };
				if (index == -1) {
					this.answers.push(answer);
				} else {
					this.answers[index] = answer;
				}
			}
		}
	};
</script>
