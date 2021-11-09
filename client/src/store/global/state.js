import { COURSE_APPROVED, COURSE_PENDING, COURSE_STATUS_STR } from "@/helpers/constants";

const state = {
	errors: {},
	courseStatus: [
		{ text: COURSE_STATUS_STR[COURSE_APPROVED], value: COURSE_APPROVED },
		{ text: COURSE_STATUS_STR[COURSE_PENDING], value: COURSE_PENDING }
	],
	uploads: [],
	isLoader: true,
	pages: {
		home: { headerBg: "", categories: [] }
	},
	appSettings: {
		brightness: 1
	}
};

export default state;
