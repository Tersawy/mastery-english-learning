import Vue from "vue";

import { COURSE_APPROVED, COURSE_PENDING, COURSE_STATUS_STR } from "@/helpers/constants";

Vue.directive("course-status", function (el, binding) {
	let v = binding.value;

	let variant = () => {
		switch (v) {
			case COURSE_PENDING:
				return "danger";
			case COURSE_APPROVED:
				return "success";
			default:
				return "info";
		}
	};

	let badge = `<span class='badge badge-outline-${variant()}'>${COURSE_STATUS_STR[v]}</span>`;

	el.innerHTML = badge;
});
