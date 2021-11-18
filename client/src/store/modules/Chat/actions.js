import api from "@/plugins/api";

export default {
	contacts({ state, commit }, queries = "") {
		return api("get", `${state.prefix}/contacts${queries}`, (err, data) => {
			if (err) {
				return console.log(err);
			}

			commit("setContacts", data);

			resolve(data);
		});
	},

	newMessage({ state, commit }, data) {
		return api("post", `${state.prefix}/new-message`, data, (err, data) => {
			if (err) return console.log(err);
			commit("addMessage", data);
		});
	},

	loadMessages({ state, commit }) {
		return api("get", `${state.prefix}/messages/${state.currentContact._id}?skip=${state.currentContact.messages.skip}`, (err, data) => {
			if (err) {
				return console.log(err);
			}

			commit("setMessages", data);

			resolve(data);
		});
	}
};
