import api from "@/plugins/api";

export default {
	getCourseDetail({ state, commit }, courseId) {
		return api("get", `${state.prefix}/${courseId}/detail/`, (err, data) => {
			if (err) {
				if (err.status != 401) {
					commit("setErrors", err.data);
				}
				return Promise.reject(err.data);
			}

			commit("setCourseDetail", data);

			return Promise.resolve(data);
		});
	},

	getCourseDetailStudents({ state, commit }, queries) {
		return api("get", `${state.prefix}/${state.detail._id}/detail/students${queries}`, (err, data) => {
			if (err) {
				if (err.status != 401) {
					commit("setErrors", err.data);
				}
				return Promise.reject(err.data);
			}

			commit("setCourseDetailStudents", data);

			return Promise.resolve(data);
		});
	},

	getCourseDetailLectures({ state, commit }, sectionId) {
		return api("get", `${state.prefix}/${state.detail._id}/detail/sections/${sectionId}/lectures`, (err, lectures) => {
			if (err) {
				if (err.status != 401) {
					commit("setErrors", err.data);
				}
				return Promise.reject(err.data);
			}

			commit("setCourseDetailLectures", { sectionId, lectures });

			return Promise.resolve(lectures);
		});
	},

	getCourseDetailSectionQuiz({ state, commit }, sectionId) {
		return api("get", `${state.prefix}/${state.detail._id}/detail/sections/${sectionId}/quiz`, (err, quiz) => {
			if (err) {
				if (err.status != 401) {
					commit("setErrors", err.data);
				}
				return Promise.reject(err.data);
			}

			commit("setCourseDetailSectionQuiz", { sectionId, quiz });

			return Promise.resolve(quiz);
		});
	}
};
