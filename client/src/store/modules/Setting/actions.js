import api from "@/plugins/api";

export default {
	getSettings({ state, commit }) {
		return api("get", `${state.prefix}`, (err, data) => {
			if (err) return;

			commit("setSettings", data);
		});
	},
	showSettings({ state, commit }) {
		return api("get", `${state.prefix}/show`, (err, data) => {
			if (err) return;

			commit("setSettingsData", data);
		});
	},
	update({ commit, state, dispatch }, { settings, config }) {
		return api("put", `${state.prefix}`, settings, config, async (err, data) => {
			if (err) {
				if (err.status != 401) {
					commit("setErrors", err.data);
				}
				return Promise.reject(err.data);
			}

			await dispatch("getSettings");

			return Promise.resolve(data);
		});
	},
	updateHomePage({ commit, state, dispatch }, { homePage, config }) {
		return api("put", `${state.prefix}/home-page`, homePage, config, async (err, data) => {
			if (err) {
				if (err.status != 401) {
					commit("setErrors", err.data);
				}
				return Promise.reject(err.data);
			}

			await dispatch("getSettings");

			return Promise.resolve(data);
		});
	},

	updateStudentCoursesPage({ commit, state, dispatch }, { studentCoursesPage, config }) {
		return api("put", `${state.prefix}/student-courses-page`, studentCoursesPage, config, async (err, data) => {
			if (err) {
				if (err.status != 401) {
					commit("setErrors", err.data);
				}
				return Promise.reject(err.data);
			}

			await dispatch("getSettings");

			return Promise.resolve(data);
		});
	}
};
