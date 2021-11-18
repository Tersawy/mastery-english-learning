import state from "./state";
import mutations from "./mutations";
import actions from "./actions";

export default {
	state,
	mutations: mutations,
	actions: actions,
	namespaced: true
};
