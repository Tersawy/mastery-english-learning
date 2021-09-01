import api from "@/plugins/api";

export default {
	create({ state, commit }, { course, config }) {
		return api("post", `${state.prefix}/`, course, config, (err, data) => {
			if (err) {
				commit("setErrors", err);
				return Promise.reject(err);
			}
			return Promise.resolve(data);
		});
	},

	update({ state, commit }, { course, config }) {
		return api("put", `${state.prefix}/${state.one._id}`, course, config, (err, data) => {
			if (err) {
				commit("setErrors", err);
				return Promise.reject(err);
			}
			return Promise.resolve(data);
		});
	},

	changeStatus({ state, commit, dispatch }, course) {
		return api("post", `${state.prefix}/${course._id}/change-status`, async (err, data) => {
			if (err) {
				commit("setErrors", err);
				return Promise.reject(err);
			}
			await dispatch("all");
			return Promise.resolve(data);
		});
	},

	remove({ state, commit }, course) {
		return api("delete", `${state.prefix}/${course._id}`, (err, data) => {
			if (err) {
				commit("setErrors", err);
				return Promise.reject(err);
			}
			commit("remove", course._id);
			return Promise.resolve(data);
		});
	},

	sections({ state, commit }) {
		return api("get", `${state.prefix}/${state.one._id}/sections`, (err, data) => {
			if (err) {
				commit("setErrors", err);
				return Promise.reject(err);
			}

			commit("setSections", data);

			return Promise.resolve(data);
		});
	},

	section({ state, commit }) {
		return api("get", `${state.prefix}/${state.one._id}/sections/${state.oneSection._id}`, (err, data) => {
			if (err) {
				commit("setErrors", err);
				return Promise.reject(err);
			}

			commit("setSection", data);

			return Promise.resolve(data);
		});
	},

	createSection({ state, commit, dispatch }, item) {
		return api("post", `${state.prefix}/${state.one._id}/sections`, item, async (err, data) => {
			if (err) {
				commit("setErrors", err);
				return Promise.reject(err);
			}
			await dispatch("sections");
			return Promise.resolve(data);
		});
	},

	updateSection({ state, commit, dispatch }, item) {
		return api("put", `${state.prefix}/${state.one._id}/sections/${state.oneSection._id}`, item, async (err, data) => {
			if (err) {
				commit("setErrors", err);
				return Promise.reject(err);
			}
			await dispatch("sections");
			return Promise.resolve(data);
		});
	},

	removeSection({ state, commit }, item) {
		return api("delete", `${state.prefix}/${state.one._id}/sections/${state.oneSection._id}`, item, async (err, data) => {
			if (err) {
				commit("setErrors", err);
				return Promise.reject(err);
			}
			commit("removeSection", item._id);
			return Promise.resolve(data);
		});
	},

	createLecture({ state, commit, dispatch }, item) {
		return api("post", `${state.prefix}/sections/${state.oneSection._id}/lectures`, item, async (err, data) => {
			if (err) {
				commit("setErrors", err);
				return Promise.reject(err);
			}
			await dispatch("section");

			commit("toggleLectures", state.oneSection);

			return Promise.resolve(data);
		});
	},

	updateLecture({ state, commit, dispatch }, item) {
		return api("put", `${state.prefix}/sections/${state.oneSection._id}/lectures/${state.oneLecture._id}`, item, async (err, data) => {
			if (err) {
				commit("setErrors", err);
				return Promise.reject(err);
			}
			await dispatch("section");

			commit("toggleLectures", state.oneSection);

			return Promise.resolve(data);
		});
	},

	removeLecture({ state, commit }, item) {
		return api("delete", `${state.prefix}/sections/${state.oneSection._id}/lectures/${item._id}`, item, (err, data) => {
			if (err) {
				commit("setErrors", err);
				return Promise.reject(err);
			}
			commit("removeLecture", item._id);

			// commit("toggleLectures", state.oneSection);

			return Promise.resolve(data);
		});
	},

	uploadLectureVideo({ state, commit, dispatch }, { formData, config }) {
		return api("post", `${state.prefix}/sections/${state.oneSection._id}/lectures/${state.oneLecture._id}/upload-video`, formData, config, async (err, data) => {
			if (err) {
				commit("setErrors", err);
				return Promise.reject(err);
			}
			await dispatch("section");

			commit("toggleLectures", state.oneSection);
			return Promise.resolve(data);
		});
	},

	changeLectureVideo({ state, commit, dispatch }, { formData, config }) {
		return api("post", `${state.prefix}/sections/${state.oneSection._id}/lectures/${state.oneLecture._id}/change-video`, formData, config, async (err, data) => {
			if (err) {
				commit("setErrors", err);
				return Promise.reject(err);
			}
			await dispatch("section");

			commit("toggleLectures", state.oneSection);
			return Promise.resolve(data);
		});
	}
};
