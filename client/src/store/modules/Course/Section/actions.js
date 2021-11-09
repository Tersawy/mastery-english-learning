import api from "@/plugins/api";

export default {
	sections({ state, commit }) {
		return api("get", `${state.prefix}/${state.one._id}/sections`, (err, data) => {
			if (err) {
				if (err.status != 401) {
					commit("setErrors", err.data);
				}
				return Promise.reject(err.data);
			}

			commit("setSections", data);

			return Promise.resolve(data);
		});
	},

	section({ state, commit }) {
		return api("get", `${state.prefix}/${state.one._id}/sections/${state.oneSection._id}`, (err, data) => {
			if (err) {
				if (err.status != 401) {
					commit("setErrors", err.data);
				}
				return Promise.reject(err.data);
			}

			commit("setSection", data);

			return Promise.resolve(data);
		});
	},

	createSection({ state, commit, dispatch }, item) {
		return api("post", `${state.prefix}/${state.one._id}/sections`, item, async (err, data) => {
			if (err) {
				if (err.status != 401) {
					commit("setErrors", err.data);
				}
				return Promise.reject(err.data);
			}

			await dispatch("sections");

			return Promise.resolve(data);
		});
	},

	updateSection({ state, commit, dispatch }, item) {
		return api("put", `${state.prefix}/${state.one._id}/sections/${state.oneSection._id}`, item, async (err, data) => {
			if (err) {
				if (err.status != 401) {
					commit("setErrors", err.data);
				}
				return Promise.reject(err.data);
			}

			await dispatch("sections");

			return Promise.resolve(data);
		});
	},

	removeSection({ state, commit }, item) {
		return api("delete", `${state.prefix}/${state.one._id}/sections/${state.oneSection._id}`, item, async (err, data) => {
			if (err) {
				if (err.status != 401) {
					commit("setErrors", err.data);
				}
				return Promise.reject(err.data);
			}

			commit("removeSection", item._id);

			return Promise.resolve(data);
		});
	},

	sectionQuiz({ state, commit }) {
		return api("get", `${state.prefix}/sections/${state.oneSection._id}/quiz`, (err, data) => {
			if (err) {
				if (err.status != 401) {
					commit("setErrors", err.data);
				}
				return Promise.reject(err.data);
			}

			commit("setSectionQuiz", data);

			return Promise.resolve(data);
		});
	},

	createSectionQuiz({ state, commit, dispatch }, item) {
		return api("post", `${state.prefix}/sections/${state.oneSection._id}/quiz`, item, async (err, data) => {
			if (err) {
				if (err.status != 401) {
					commit("setErrors", err.data);
				}
				return Promise.reject(err.data);
			}

			await dispatch("sectionQuiz");

			return Promise.resolve(data);
		});
	},

	updateSectionQuiz({ state, commit, dispatch }, item) {
		return api("put", `${state.prefix}/sections/${state.oneSection._id}/quiz/${state.oneSection.quiz._id}`, item, async (err, data) => {
			if (err) {
				if (err.status != 401) {
					commit("setErrors", err.data);
				}
				return Promise.reject(err.data);
			}

			await dispatch("sectionQuiz");

			return Promise.resolve(data);
		});
	},

	removeSectionQuiz({ state, commit }, item) {
		return api("delete", `${state.prefix}/sections/${state.oneSection._id}/quiz/${state.oneSection.quiz._id}`, item, async (err, data) => {
			if (err) {
				if (err.status != 401) {
					commit("setErrors", err.data);
				}
				return Promise.reject(err.data);
			}

			commit("removeSectionQuiz", item._id);

			return Promise.resolve(data);
		});
	},

	createSectionQuestion({ state, commit, dispatch }, item) {
		return api("post", `${state.prefix}/sections/quiz/${state.oneSection.quiz._id}/questions`, item, async (err, data) => {
			if (err) {
				if (err.status != 401) {
					commit("setErrors", err.data);
				}
				return Promise.reject(err.data);
			}

			await dispatch("sectionQuiz");

			return Promise.resolve(data);
		});
	},

	updateSectionQuestion({ state, commit, dispatch }, item) {
		return api("put", `${state.prefix}/sections/quiz/${state.oneSection.quiz._id}/questions/${state.oneSectionQuestion._id}`, item, async (err, data) => {
			if (err) {
				if (err.status != 401) {
					commit("setErrors", err.data);
				}
				return Promise.reject(err.data);
			}

			await dispatch("sectionQuiz");

			return Promise.resolve(data);
		});
	},

	removeSectionQuestion({ state, commit }) {
		return api("delete", `${state.prefix}/sections/quiz/${state.oneSection.quiz._id}/questions/${state.oneSectionQuestion._id}`, {}, async (err, data) => {
			if (err) {
				if (err.status != 401) {
					commit("setErrors", err.data);
				}
				return Promise.reject(err.data);
			}

			commit("removeSectionQuestion");

			return Promise.resolve(data);
		});
	},

	createSectionAnswers({ state, commit /* dispatch */ }, item) {
		return api("post", `${state.prefix}/${state.one._id}/sections/quiz/${state.oneSection.quiz._id}/answer`, item, async (err, data) => {
			if (err) {
				if (err.status != 401) {
					commit("setErrors", err.data);
				}
				return Promise.reject(err.data);
			}

			// await dispatch("quiz");
			return Promise.resolve(data);
		});
	}
};
