import sectionMutations from "./Section/mutations";
import lectureMutations from "./Lecture/mutations";
import detailMutations from "./Detail/mutations";

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

	setMyCourses(state, data) {
		state.myCourses.docs = data.docs;
		state.myCourses.total = data.total;
	},

	...sectionMutations,

	...lectureMutations,

	...detailMutations
};
