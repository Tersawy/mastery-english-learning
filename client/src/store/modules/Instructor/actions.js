import api from "@/plugins/api";

export default {
	changeStatus({ state, commit, dispatch }, user) {
		return api("post", `${state.prefix}/${user._id}`, user, async (err, data) => {
			if (err) {
				if (err.status != 401) {
					commit("setErrors", err.data);
				}
				return Promise.reject(err.data);
			}

			await dispatch("all");

			return Promise.resolve(data);
		});
	}
};
