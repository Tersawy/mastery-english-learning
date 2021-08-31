import Vue from "vue";

Vue.filter("strLength", function (value, count = 10) {
	if (!value) return "";

	if (value.toString().length <= count) return value;

	return value.toString().slice(0, count) + " ...";
});

Vue.filter("date", function (value) {
	if (!value) return "";

	let date = new Date(value);

	let dayStr = date.toDateString().split(" ")[0];

	let fullDate = date.toLocaleDateString();

	return `${dayStr}, ${fullDate}`;
});
