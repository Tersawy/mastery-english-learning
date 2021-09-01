import { showToast } from "@/helpers/utils";

export default {
	methods: {
		setGlobalError(msg) {
			showToast(msg, "danger");
		},
		setGlobalSuccess(msg) {
			showToast(msg, "success");
		},
		removeAllErrors() {
			this.$store.commit(`${this.namespace}/removeErrors`);
		}
	}
};
