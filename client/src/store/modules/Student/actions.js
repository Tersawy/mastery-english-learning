import api from "@/plugins/api";

export default {
	enroll({ state, commit }, course) {
		return api("post", `${state.prefix}/enroll`, { courseId: course._id }, (err, data) => {
			if (err) {
				commit("setErrors", err);
				return Promise.reject(err);
			}
			return Promise.resolve(data);
		});
	}
};
