import api from "@/plugins/api";

export default {
	getDashboard({ state, commit }) {
		return api("get", `${state.prefix}/dashboard`, (err, data) => {
			if (err) {
				Promise.reject(err);
				return console.log(err);
			}
			commit("setDashboard", data);
			Promise.resolve(data);
		});
	}
};
