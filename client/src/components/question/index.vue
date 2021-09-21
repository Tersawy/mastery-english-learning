<template>
	<component :is="questions[question.type]" :question="question" @input="handleAnswer" />
</template>

<script>
	import QuestionComplete from "./complete";
	import QuestionChoiceOne from "./choiceOne.vue";
	import QuestionTrueOrFalse from "./trueOrFalse.vue";
	import QuestionEssay from "./essay.vue";
	import QuestionSpeech from "./speech.vue";

	import { QUESTION_COMPLETE, QUESTION_CHOICE_ONE, QUESTION_TRUE_OR_FALSE, QUESTION_ESSAY, QUESTION_SPEECH } from "@/helpers/constants";

	export default {
		props: ["question", "answers"],

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

		mounted() {
			console.log(this.question);
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
