export default {
	setCourseDetail(state, data) {
		state.detail = data;
	},

	setCourseDetailStudents(state, data) {
		state.detail.students = data;
	},

	setCourseDetailLectures(state, { lectures, sectionId }) {
		let section = state.detail.sections.find((section) => section._id == sectionId);

		if (!section) {
			state.oneSectionDetail = { lectures: [], quiz: {} };
			return;
		}

		state.oneSectionDetail = { ...section, quiz: {}, lectures };
	},

	setCourseDetailSectionQuiz({ state }, { quiz, sectionId }) {
		let section = state.detail.sections.find((section) => section._id == sectionId);

		if (!section) {
			state.oneSectionDetail = { lectures: [], quiz: {} };
			return;
		}

		state.oneSectionDetail = { ...section, quiz };
	}
};
