import api from "@/plugins/api";

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

	sectionQuiz({ state, commit }) {
		return api("get", `${state.prefix}/sections/${state.oneSection._id}/quiz`, (err, data) => {
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
		return api("put", `${state.prefix}/sections/${state.oneSection._id}/quiz/${state.oneQuiz._id}`, item, async (err, data) => {
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
		return api("delete", `${state.prefix}/sections/${state.oneSection._id}/quiz/${state.oneQuiz._id}`, item, async (err, data) => {
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

	createSectionQuestion({ state, commit, dispatch }, item) {
		return api("post", `${state.prefix}/sections/quiz/${state.oneQuiz._id}/questions`, item, async (err, data) => {
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
		return api("put", `${state.prefix}/sections/quiz/${state.oneQuiz._id}/questions/${state.oneQuestion._id}`, item, async (err, data) => {
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
		return api("delete", `${state.prefix}/sections/quiz/${state.oneQuiz._id}/questions/${state.oneQuestion._id}`, {}, async (err, data) => {
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

	createSectionAnswers({ state, commit /* dispatch */ }, item) {
		return api("post", `${state.prefix}/${state.one._id}/sections/quiz/${state.oneQuiz._id}/answer`, item, async (err, data) => {
			if (err) {
				if (err.status != 401) {
					commit("setErrors", err.data);
				}
				return Promise.reject(err.data);
			}

			// await dispatch("quiz");
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
