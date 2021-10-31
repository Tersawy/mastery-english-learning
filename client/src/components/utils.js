import { BToast } from "bootstrap-vue";

import Vue from "vue";

export const showToast = (message, variant = "success") => {
	let bootStrapToaster = new BToast();

	bootStrapToaster.$bvToast.toast(message, {
		title: message,
		toaster: "b-toaster-top-right",
		solid: true,
		appendToast: false,
		bodyClass: "d-none",
		variant
	});
};

export const sweetAlert = (options) => {
	const swalWithBootstrapButtons = Vue.swal.mixin({
		customClass: {
			confirmButton: "btn btn-primary btn-lg",
			cancelButton: "btn btn-danger"
		},
		buttonsStyling: false
	});
	return swalWithBootstrapButtons.fire(options);
};
