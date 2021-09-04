import api from "@/plugins/api";

export default {
	getHomePage({ commit }) {
		return api("get", "/pages/home", (err, data) => {
			if (err) {
				return Promise.reject(err);
			}

			commit("setHomePage", data);

			Promise.resolve(data);
		});
	}
};
