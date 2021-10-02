import api from "@/plugins/api";

export const me = async ({ commit }) => {
	return api("post", "me", (err, data) => {
		if (err) return;
		commit("me", data);
	});
};

export const login = async ({ commit }, payload) => {
	commit("removeErrors");
	return api("post", "login", payload, (err, data) => {
		if (err) {
			commit("setErrors", err.data);
			return Promise.reject(err.data);
		}
		commit("login", data);
		return Promise.resolve(data);
	});
};

export const register = async ({ commit }, payload) => {
	commit("removeErrors");
	return api("post", "register", payload, (err, data) => {
		if (err) {
			if (err.status != 401) {
				commit("setErrors", err.data);
			}
			return Promise.reject(err.data);
		}
		return Promise.resolve(data);
	});
};

export const logout = ({ commit }) => {
	return api("post", "logout", {}, (err) => {
		if (err) return;
		commit("logout");
	});
};

export const resetPassword = ({ commit }, payload) => {
	commit("removeErrors");
	return api("post", "reset-password", payload, (err) => {
		if (err) return;
		commit("resetPassword", data);
	});
};

export const verifyToken = ({ commit }, payload) => {
	return api("post", "verify", payload, (err, data) => {
		if (err) return;
		commit("verifyToken", data);
	});
};

export const newPassword = ({ commit }, payload) => {
	commit("removeErrors");
	return api("post", "reset-password", payload, (err, data) => {
		if (err) return;
		commit("newPassword", data);
	});
};

export const updateProfile = ({ commit, dispatch }, payload) => {
	commit("removeErrors");
	return api("post", "update-profile", payload, async (err, data) => {
		if (err) {
			if (err.status != 401) {
				commit("setErrors", err.data);
			}
			return Promise.reject(err.data);
		}

		await dispatch("me");

		return Promise.resolve(data);
	});
};

export const updateProfileImage = ({ commit, dispatch }, { formData, config }) => {
	commit("removeErrors");
	return api("post", "update-profile-image", formData, config, async (err, data) => {
		if (err) {
			if (err.status != 401) {
				commit("setErrors", err.data);
			}
			return Promise.reject(err.data);
		}

		await dispatch("me");

		return Promise.resolve(data);
	});
};
