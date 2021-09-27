import api from "@/plugins/api";

const all = ({ commit, state }, queries = "") => {
	api("get", state.prefix + queries, (err, data) => {
		if (err) {
			if (err.status != 401) {
				commit("setErrors", err.data);
			}
			return Promise.reject(err.data);
		}

		commit("all", data);
	});
};

const options = ({ commit, state }) => {
	return api("get", `${state.prefix}/options`, (err, data) => {
		if (err) return commit("setErrors", err);
		commit("options", data);
	});
};

const edit = ({ commit, state }, itemId) => {
	return api("get", `${state.prefix}/${itemId}/edit`, (err, data) => {
		if (err) {
			if (err.status != 401) {
				commit("setErrors", err.data);
			}
			return Promise.reject(err.data);
		}

		commit("setOne", data);

		return Promise.resolve(data);
	});
};

const one = ({ commit, state }, itemId) => {
	return api("get", `${state.prefix}/${itemId}`, (err, data) => {
		if (err) {
			if (err.status != 401) {
				commit("setErrors", err.data);
			}
			return Promise.reject(err.data);
		}

		commit("setOne", data);

		return Promise.resolve(data);
	});
};

const show = ({ commit, state }, itemId) => {
	return api("get", `${state.prefix}/${itemId}`, (err, data) => {
		if (err) {
			if (err.status != 401) {
				commit("setErrors", err.data);
			}
			return Promise.reject(err.data);
		}

		commit("setOne", data);

		return Promise.resolve(data);
	});
};

const create = ({ state, commit }, item) => {
	return api("post", `${state.prefix}`, item, (err, data) => {
		if (err) {
			if (err.status != 401) {
				commit("setErrors", err.data);
			}
			return Promise.reject(err.data);
		}

		return Promise.resolve(data);
	});
};

const update = ({ state, commit }, item) => {
	return api("put", `${state.prefix}/${item._id}`, item, (err, data) => {
		if (err) {
			if (err.status != 401) {
				commit("setErrors", err.data);
			}
			return Promise.reject(err.data);
		}

		return Promise.resolve(data);
	});
};

const moveToTrash = ({ commit, state }, item) => {
	return api("post", `${state.prefix}/${item._id}/trash`, item, (err, data) => {
		if (err) {
			if (err.status != 401) {
				commit("setErrors", err.data);
			}
			return Promise.reject(err.data);
		}

		commit("remove", item._id);

		return Promise.resolve(data);
	});
};

const trashed = ({ commit, state }, item) => {
	api("get", `${state.prefix}/trashed`, item, (err, data) => {
		if (err) {
			if (err.status != 401) {
				commit("setErrors", err.data);
			}
			return Promise.reject(err.data);
		}

		commit("all", data);
	});
};

const restore = ({ commit, state }, item) => {
	return api("post", `${state.prefix}/${item._id}/restore`, item, (err, data) => {
		if (err) {
			if (err.status != 401) {
				commit("setErrors", err.data);
			}
			return Promise.reject(err.data);
		}

		commit("remove", item._id);

		return Promise.resolve(data);
	});
};

const remove = ({ commit, state }, item) => {
	return api("delete", `${state.prefix}/${item._id}`, item, (err, data) => {
		if (err) {
			if (err.status != 401) {
				commit("setErrors", err.data);
			}
			return Promise.reject(err.data);
		}

		commit("remove", item._id);

		return Promise.resolve(data);
	});
};

export default { all, options, edit, one, show, create, update, moveToTrash, trashed, restore, remove };
