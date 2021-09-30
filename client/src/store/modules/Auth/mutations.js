import { showToast } from "@/components/utils";
import router from "@/router";

export const login = (state, data) => {
	state.user = data.user;
	state.token = data.token;
	sessionStorage.setItem("user", JSON.stringify(data.user));
	sessionStorage.setItem("token", data.token);
};

export const me = (state, data) => {
	state.user = data.user;
	sessionStorage.setItem("user", JSON.stringify(data.user));
};

export const logout = (state) => {
	state.user = {};
	state.token = null;
	sessionStorage.removeItem("user");
	sessionStorage.removeItem("token");
	if (router.history.current.name != "Login") {
		router.push("/login");
	}
};

export const resetPassword = (state, data) => {
	console.log(data);
};

export const verifyToken = (state, data) => {
	console.log(data);
};

export const newPassword = (state, data) => {
	console.log(data);
};

export const setError = (state, { field, msg }) => {
	state.errors = { ...state.errors, [field]: [msg] };
};

export const setErrors = (state, { msg, errors = {} }) => {
	state.errors = errors;
	if (msg) showToast(msg, "danger");
};

export const removeErrors = (state) => (state.errors = {});
