import api from "@/plugins/api";

export const me = async ({ commit }) => {
	return api("post", "me", (err, res) => {
		if (err) return commit("logout");
		commit("me", res.data);
	});
};

export const login = async ({ commit }, payload) => {
	commit("removeErrors");
	return api("post", "login", payload, (err, data) => {
		if (err) {
			commit("setErrors", err);
			return Promise.reject(err);
		}
		commit("login", data);
		return Promise.resolve(data);
	});
};

export const register = async ({ commit }, payload) => {
	commit("removeErrors");
	return api("post", "register", payload, (err, data) => {
		if (err) {
			commit("setErrors", err);
			return Promise.reject(err);
		}
		return Promise.resolve(data);
	});
};

export const logout = ({ commit }) => {
	return api("post", "logout", {}, (err, res) => {
		if (err) return;
		commit("logout", res.data);
	});
};

export const resetPassword = ({ commit }, payload) => {
	commit("removeErrors");
	return api("post", "reset-password", payload, (err, res) => {
		if (err) return;
		commit("resetPassword", res.data);
	});
};

export const verifyToken = ({ commit }, payload) => {
	return api("post", "verify", payload, (err, res) => {
		if (err) return;
		commit("verifyToken", res.data);
	});
};

export const newPassword = ({ commit }, payload) => {
	commit("removeErrors");
	return api("post", "reset-password", payload, (err, res) => {
		if (err) return;
		commit("newPassword", res.data);
	});
};

export const updateProfile = ({ commit }, payload) => {
	commit("removeErrors");
	return api("post", "update-profile", payload, (err, res) => {
		if (err) return;
		commit("updateProfile", res.data);
	});
};
