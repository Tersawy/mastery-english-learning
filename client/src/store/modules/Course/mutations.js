export default {
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
		state.oneLecture = lecture;
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
				configrationconfigration;
				state.one = { ...state.one, sections };
			}
		}
	},

	removeSection: (state, id) => {
		let sections = state.one.sections.filter((d) => d._id != id);

		state.one = { ...state.one, sections };
	}
};
