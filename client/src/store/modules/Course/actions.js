import api from "@/plugins/api";

import sectionActions from "./Section/actions";
import lectureActions from "./Lecture/actions";

export default {
	create({ state, commit }, { course, config }) {
		return api("post", `${state.prefix}/`, course, config, (err, data) => {
			if (err) {
				if (err.status != 401) {
					commit("setErrors", err.data);
				}
				return Promise.reject(err.data);
			}

			return Promise.resolve(data);
		});
	},

	start({ commit, state }, courseId) {
		return api("get", `${state.prefix}/${courseId}/start`, (err, data) => {
			if (err) {
				if (err.status != 401) {
					commit("setErrors", err.data);
				}
				return Promise.reject(err.data);
			}

			commit("setOne", data);

			return Promise.resolve(data);
		});
	},

	update({ state, commit }, { course, config }) {
		return api("put", `${state.prefix}/${state.one._id}`, course, config, (err, data) => {
			if (err) {
				if (err.status != 401) {
					commit("setErrors", err.data);
				}
				return Promise.reject(err.data);
			}

			return Promise.resolve(data);
		});
	},

	changeStatus({ state, commit, dispatch }, course) {
		return api("post", `${state.prefix}/${course._id}/change-status`, async (err, data) => {
			if (err) {
				if (err.status != 401) {
					commit("setErrors", err.data);
				}
				return Promise.reject(err.data);
			}

			await dispatch("all");

			return Promise.resolve(data);
		});
	},

	remove({ state, commit }, course) {
		return api("delete", `${state.prefix}/${course._id}`, (err, data) => {
			if (err) {
				if (err.status != 401) {
					commit("setErrors", err.data);
				}
				return Promise.reject(err.data);
			}

			commit("remove", course._id);

			return Promise.resolve(data);
		});
	},

	...sectionActions,
	...lectureActions
};
