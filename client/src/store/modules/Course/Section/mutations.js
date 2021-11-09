export default {
	setSections: (state, data) => {
		state.one = { ...state.one, sections: data.docs };
	},

	setSection: (state, section) => {
		state.oneSection = { ...section, quiz: {} };
		let sections = state.one.sections;

		if (Array.isArray(sections)) {
			let index = sections.findIndex((s) => s._id == section._id);

			if (index != -1) {
				sections[index] = { ...section, quiz: {} };
				state.one = { ...state.one, sections };
			}
		}
	},

	removeSection: (state, id) => {
		let sections = state.one.sections.filter((d) => d._id != id);

		state.one = { ...state.one, sections };
	},

	setSectionQuiz: (state, quiz) => {
		state.oneSectionQuiz = quiz;
		state.oneSection = { ...state.oneSection, quiz };
	},

	removeSectionQuiz: (state) => {
		state.oneSectionQuiz = {};
		state.oneSection = { ...state.oneSection, quiz: {} };
	},

	setSectionQuestion: (state, question) => {
		state.oneSectionQuestion = question;
	},

	removeSectionQuestion: (state) => {
		let questions = state.oneSectionQuiz.questions.filter((q) => q._id != state.oneSectionQuestion._id);

		state.oneSectionQuiz = { ...state.oneSectionQuiz, questions };

		state.oneSection.quiz = { ...state.oneSectionQuiz, questions };

		state.oneSectionQuestion = {};
	}
};
