export default {
	setCourseDetail(state, data) {
		state.detail = data;
		state.oneSectionDetail = { lectures: [], quiz: { studentsAnswers: [] } };
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

	setCourseDetailSectionQuiz(state, { quiz, sectionId }) {
		let section = state.detail.sections.find((section) => section._id == sectionId);

		if (!section) {
			state.oneSectionDetail = { lectures: [], quiz: {} };
			return;
		}

		state.oneSectionDetail = { ...section, lectures: [], quiz };
	},

	setCourseDetailSectionQuizStudentsAnswers(state, { quizId, studentsAnswers }) {
		if (!state.oneSectionDetail.quiz._id == quizId) return;

		state.oneSectionDetail.quiz.studentsAnswers = studentsAnswers;
	}
};
