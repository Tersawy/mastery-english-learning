import QuestionComplete from "./complete";
import QuestionChoiseOne from "./choiseOne";
import QuestionTrueOrFalse from "./trueOrFalse";
import QuestionEssay from "./essay";
import QuestionSpeech from "./speech";

import { QUESTION_COMPLETE, QUESTION_CHOISE_ONE, QUESTION_TRUE_OR_FALSE, QUESTION_ESSAY, QUESTION_SPEECH } from "@/helpers/constants";

export default {
	props: ["question", "formData"],
	render() {
		switch (this.question.type) {
			case QUESTION_COMPLETE:
				return <QuestionComplete question={this.question} onInput={this.handleComplete} />;
			case QUESTION_CHOISE_ONE:
				return <QuestionChoiseOne question={this.question} onInput={this.handleChoiseOne} />;
			case QUESTION_TRUE_OR_FALSE:
				return <QuestionTrueOrFalse question={this.question} onInput={this.handleTrueOrFalse} />;
			case QUESTION_ESSAY:
				return <QuestionEssay question={this.question} onInput={this.handleEssay} />;
			case QUESTION_SPEECH:
				return <QuestionSpeech question={this.question} onInput={this.handleSpeech} />;
		}
	},
	methods: {
		handleComplete(values) {
			values.forEach((v, i) => {
				this.formData.set(`${this.question._id}[${i}]`, v);
			});
		},
		handleChoiseOne(value) {
			this.formData.set(this.question._id, value);
		},
		handleTrueOrFalse(value) {
			this.formData.set(this.question._id, value);
		},
		handleEssay(value) {
			this.formData.set(this.question._id, value);
		},
		handleSpeech(value) {
			this.formData.set(this.question._id, value);
		}
	}
};
