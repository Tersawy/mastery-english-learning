import api from "@/plugins/api";

export default {
	createLecture({ state, commit, dispatch }, item) {
		return api("post", `${state.prefix}/sections/${state.oneSection._id}/lectures`, item, async (err, data) => {
			if (err) {
				if (err.status != 401) {
					commit("setErrors", err.data);
				}
				return Promise.reject(err.data);
			}

			await dispatch("section");

			commit("toggleLectures", state.oneSection);

			return Promise.resolve(data);
		});
	},

	updateLecture({ state, commit, dispatch }, item) {
		return api("put", `${state.prefix}/sections/${state.oneSection._id}/lectures/${state.oneLecture._id}`, item, async (err, data) => {
			if (err) {
				if (err.status != 401) {
					commit("setErrors", err.data);
				}
				return Promise.reject(err.data);
			}

			await dispatch("section");

			commit("toggleLectures", state.oneSection);

			return Promise.resolve(data);
		});
	},

	removeLecture({ state, commit }, item) {
		return api("delete", `${state.prefix}/sections/${state.oneSection._id}/lectures/${item._id}`, item, (err, data) => {
			if (err) {
				if (err.status != 401) {
					commit("setErrors", err.data);
				}
				return Promise.reject(err.data);
			}

			commit("removeLecture", item._id);

			// commit("toggleLectures", state.oneSection);

			return Promise.resolve(data);
		});
	},

	changeLectureVideoReview({ state, commit, dispatch }, item) {
		return api("post", `${state.prefix}/sections/${state.oneSection._id}/lectures/${state.oneLecture._id}/change-review`, item, async (err, data) => {
			if (err) {
				if (err.status != 401) {
					commit("setErrors", err.data);
				}
				return Promise.reject(err.data);
			}

			return Promise.resolve(data);
		});
	},

	uploadLectureVideo({ state, commit, dispatch }, { formData, config }) {
		return api("post", `${state.prefix}/sections/${state.oneSection._id}/lectures/${state.oneLecture._id}/upload-video`, formData, config, async (err, data) => {
			if (err) {
				if (err.status != 401) {
					commit("setErrors", err.data);
				}
				return Promise.reject(err.data);
			}

			await dispatch("section");

			commit("toggleLectures", state.oneSection);

			return Promise.resolve(data);
		});
	},

	changeLectureVideo({ state, commit, dispatch }, { formData, config }) {
		return api("post", `${state.prefix}/sections/${state.oneSection._id}/lectures/${state.oneLecture._id}/change-video`, formData, config, async (err, data) => {
			if (err) {
				if (err.status != 401) {
					commit("setErrors", err.data);
				}
				return Promise.reject(err.data);
			}

			await dispatch("section");

			commit("toggleLectures", state.oneSection);

			return Promise.resolve(data);
		});
	},

	quiz({ state, commit }) {
		return api("get", `${state.prefix}/sections/lectures/${state.oneLecture._id}/quiz`, (err, data) => {
			if (err) {
				if (err.status != 401) {
					commit("setErrors", err.data);
				}
				return Promise.reject(err.data);
			}

			commit("setQuiz", data);

			return Promise.resolve(data);
		});
	},

	createQuiz({ state, commit, dispatch }, item) {
		return api("post", `${state.prefix}/sections/lectures/${state.oneLecture._id}/quiz`, item, async (err, data) => {
			if (err) {
				if (err.status != 401) {
					commit("setErrors", err.data);
				}
				return Promise.reject(err.data);
			}

			await dispatch("quiz");

			return Promise.resolve(data);
		});
	},

	updateQuiz({ state, commit, dispatch }, item) {
		return api("put", `${state.prefix}/sections/lectures/${state.oneLecture._id}/quiz/${state.oneQuiz._id}`, item, async (err, data) => {
			if (err) {
				if (err.status != 401) {
					commit("setErrors", err.data);
				}
				return Promise.reject(err.data);
			}

			await dispatch("quiz");

			return Promise.resolve(data);
		});
	},

	removeQuiz({ state, commit }, item) {
		return api("delete", `${state.prefix}/sections/lectures/${state.oneLecture._id}/quiz/${state.oneQuiz._id}`, item, async (err, data) => {
			if (err) {
				if (err.status != 401) {
					commit("setErrors", err.data);
				}
				return Promise.reject(err.data);
			}

			commit("removeQuiz", item._id);

			return Promise.resolve(data);
		});
	},

	createQuestion({ state, commit, dispatch }, item) {
		return api("post", `${state.prefix}/sections/lectures/quiz/${state.oneQuiz._id}/questions`, item, async (err, data) => {
			if (err) {
				if (err.status != 401) {
					commit("setErrors", err.data);
				}
				return Promise.reject(err.data);
			}

			await dispatch("quiz");

			return Promise.resolve(data);
		});
	},

	updateQuestion({ state, commit, dispatch }, item) {
		return api("put", `${state.prefix}/sections/lectures/quiz/${state.oneQuiz._id}/questions/${state.oneQuestion._id}`, item, async (err, data) => {
			if (err) {
				if (err.status != 401) {
					commit("setErrors", err.data);
				}
				return Promise.reject(err.data);
			}

			await dispatch("quiz");

			return Promise.resolve(data);
		});
	},

	removeQuestion({ state, commit }) {
		return api("delete", `${state.prefix}/sections/lectures/quiz/${state.oneQuiz._id}/questions/${state.oneQuestion._id}`, {}, async (err, data) => {
			if (err) {
				if (err.status != 401) {
					commit("setErrors", err.data);
				}
				return Promise.reject(err.data);
			}

			commit("removeQuestion");

			return Promise.resolve(data);
		});
	},

	createAnswer({ state, commit /* dispatch */ }, payload) {
		return api(
			"post",
			`${state.prefix}/${state.one._id}/sections/lectures/quiz/${state.oneQuiz._id}/question/${payload.questionId}/answer`,
			payload.answer,
			async (err, data) => {
				if (err) {
					if (err.status != 401) {
						commit("setErrors", err.data);
					}
					return Promise.reject(err.data);
				}

				// await dispatch("quiz");
				return Promise.resolve(data);
			}
		);
	}
};
