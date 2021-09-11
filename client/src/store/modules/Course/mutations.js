export default {
	setOne: (state, data) => {
		if (data.sections && data.sections.length) {
			let sections = data.sections.map((section) => {
				section.lecturesVisible = false;

				section.lectures = section.lectures.map((l) => ({ ...l, descriptionVisible: false }));

				return section;
			});

			data.sections = sections;
		}

		state.one = data;
	},

	setSections: (state, data) => {
		state.one = { ...state.one, sections: data.docs };
	},

	toggleLectures: (state, section) => {
		let sections = state.one.sections.map((s) => {
			if (s._id == section._id) {
				s.lecturesVisible = !s.lecturesVisible;
			}
			return s;
		});

		state.one = { ...state.one, sections };
	},

	setLecture: (state, lecture) => {
		state.oneLecture = { ...lecture, quiz: {} };
	},

	removeLecture: (state, id) => {
		let sectionId = state.oneSection._id;

		let sections = [...state.one.sections];

		let sectionIndex = sections.findIndex((d) => d._id == sectionId);

		if (sectionIndex != -1) {
			sections[sectionIndex].lectures = sections[sectionIndex].lectures.filter((l) => l._id != id);
		}

		state.one = { ...state.one, sections };
	},

	setSection: (state, section) => {
		state.oneSection = section;
		let sections = state.one.sections;

		if (Array.isArray(sections)) {
			let index = sections.findIndex((s) => s._id == section._id);

			if (index != -1) {
				sections[index] = section;
				state.one = { ...state.one, sections };
			}
		}
	},

	removeSection: (state, id) => {
		let sections = state.one.sections.filter((d) => d._id != id);

		state.one = { ...state.one, sections };
	},

	setQuiz: (state, quiz) => {
		state.oneQuiz = quiz;
		state.oneLecture = { ...state.oneLecture, quiz };
	},

	removeQuiz: (state) => {
		state.oneQuiz = {};
		state.oneLecture = { ...state.oneLecture, quiz: {} };
	},

	setQuestion: (state, question) => {
		state.oneQuestion = question;
	},

	removeQuestion: (state) => {
		let questions = state.oneQuiz.questions.filter((q) => q._id != state.oneQuestion._id);

		state.oneQuiz = { ...state.oneQuiz, questions };

		state.oneQuestion = {};
	}
};
