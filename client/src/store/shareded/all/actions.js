import api from "@/plugins/api";

const all = ({ commit, state }, queries = "") => {
	api("get", state.prefix + queries, (err, data) => {
		if (err) return commit("setErrors", err);
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
			commit("setErrors", err);
			return Promise.reject(err);
		}
		commit("setOne", data);
		return Promise.resolve(data);
	});
};

const one = ({ commit, state }, itemId) => {
	return api("get", `${state.prefix}/${itemId}`, (err, data) => {
		if (err) {
			commit("setErrors", err);
			return Promise.reject(err);
		}
		commit("setOne", data);
		return Promise.resolve(data);
	});
};

const show = ({ commit, state }, itemId) => {
	return api("get", `${state.prefix}/${itemId}`, (err, data) => {
		if (err) {
			commit("setErrors", err);
			return Promise.reject(err);
		}
		commit("setOne", data);
		return Promise.resolve(data);
	});
};

const create = ({ state, commit, dispatch }, item) => {
	return api("post", `${state.prefix}`, item, (err, data) => {
		if (err) {
			commit("setErrors", err);
			return Promise.reject(err);
		}
		dispatch("all");
		return Promise.resolve(data);
	});
};

const update = ({ state, commit, dispatch }, item) => {
	return api("put", `${state.prefix}/${item.id}`, item, (err, data) => {
		if (err) {
			commit("setErrors", err);
			return Promise.reject(err);
		}
		dispatch("all");
		return Promise.resolve(data);
	});
};

const moveToTrash = ({ commit, state }, item) => {
	return api("post", `${state.prefix}/${item.id}/trash`, item, (err, data) => {
		if (err) {
			commit("setErrors", err);
			return Promise.reject(err);
		}
		commit("remove", item.id);
		return Promise.resolve(data);
	});
};

const trashed = ({ commit, state }, item) => {
	api("get", `${state.prefix}/trashed`, item, (err, data) => {
		if (err) return commit("setErrors", err);
		commit("all", data);
	});
};

const restore = ({ commit, state }, item) => {
	return api("post", `${state.prefix}/${item.id}/restore`, item, (err, data) => {
		if (err) {
			commit("setErrors", err);
			return Promise.reject(err);
		}
		commit("remove", item.id);
		return Promise.resolve(data);
	});
};

const remove = ({ commit, state }, item) => {
	return api("post", `${state.prefix}/${item.id}`, item, (err, data) => {
		if (err) {
			commit("setErrors", err);
			return Promise.reject(err);
		}
		commit("remove", item.id);
		return Promise.resolve(data);
	});
};

export default { all, options, edit, one, show, create, update, moveToTrash, trashed, restore, remove };
