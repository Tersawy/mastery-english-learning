import api from "@/plugins/api";

export default {
	enroll({ state, commit }, course) {
		return api("post", `${state.prefix}/enroll`, { courseId: course._id }, (err, data) => {
			if (err) {
				if (err.status != 401) {
					commit("setErrors", err.data);
				}
				return Promise.reject(err.data);
			}

			return Promise.resolve(data);
		});
	}
};
