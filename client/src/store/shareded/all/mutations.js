import { showToast } from "@/helpers/utils";

const all = (state, data) => {
	state.all.docs = data.docs;
	state.all.total = data.total;
};

const options = (state, res) => {
	let opts = res.data.map((opt) => ({ ...opt, disabled: false }));

	let firstOpt = null;

	if (state.options.length) {
		let first_opt = state.options.slice(0, 1)[0];

		if (first_opt._id === null || first_opt._id == "") {
			firstOpt = first_opt;
		}
	}

	state.options = firstOpt ? [firstOpt, ...opts] : opts;
};

const setOne = (state, one) => {
	state.one = one;
};

const remove = (state, id) => {
	state.all.docs = state.all.docs.filter((doc) => doc._id != id);
	state.all.total -= 1;
};

const setError = (state, { field, msg }) => {
	state.errors = { ...state.errors, [field]: [msg] };
};

const removeError = (state, field) => {
	state.errors = Object.keys(state.errors)
		.filter((f) => f != field)
		.map((f) => ({ [f]: state.errors[f] }));
};

const setErrors = (state, { msg, errors }) => {
	state.errors = errors;
	if (msg) showToast(msg, "danger");
};

const removeErrors = (state) => (state.errors = {});

export default { all, options, setOne, remove, setError, removeError, setErrors, removeErrors };
