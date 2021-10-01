import axios from "axios";
import store from "@/store";

let api = async (method, route, data, config, callback) => {
	let params, isCallback;

	axios.defaults.headers.common["Authorization"] = store.state.Auth.token;

	axios.defaults.baseURL = process.env.VUE_APP_API_URL;

	callback = typeof data === "function" ? data : callback;

	callback = typeof config === "function" ? config : callback;

	isCallback = typeof callback === "function";

	let configData = typeof config === "object" ? config : {};

	data = typeof data === "object" ? data : {};

	configData.headers = configData.headers ? configData.headers : {};

	configData.headers["Content-Type"] = configData.headers["Content-Type"] ? configData.headers["Content-Type"] : "application/json";

	params = method == "get" ? [route] : [route, data];

	try {
		let res = await axios[method](...params, configData);

		if (res.data.message) store.commit("setSuccess", res.data.message);

		if (isCallback) {
			return callback(null, res.data);
		}

		return Promise.resolve(res.data);
	} catch (err) {
		if (!err.response) return;

		const { response } = err;

		if (response.status == 401) {
			store.commit("Auth/logout");
		}

		let error = { data: response.data, status: response.status };

		if (isCallback) {
			return callback(error);
		}

		return Promise.reject(error);
	}
};

export default api;
