export default {
	setSettings(state, settings) {
		state.settings = settings;
	},
	setSettingsData(state, settings) {
		state.settingsData = settings;
	},
	setErrors(state, { msg, errors }) {
		state.errors = errors || {};
		if (msg) showToast(msg, "danger");
	}
};
