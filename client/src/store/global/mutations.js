import { showToast } from "@/helpers/utils";

export const setSuccess = (_state, message) => showToast(message);

export const setErrors = (state, { message, errors }) => {
	state.errors = errors;
	if (message) showToast(message, "danger");
};

export const setError = (_state, message) => showToast(message, "danger");

export const setBreads = (state, breads) => (state.breads = breads);

export const setUpload = (state, newUpload) => (state.uploads = [...state.uploads, newUpload]);

export const removeUpload = (state, upload) => {
	state.uploads = state.uploads.filter((old) => old.id != upload.id);
};

export const setUploadProgress = (state, upload) => {
	let oldUpload = state.uploads.find((old) => old.id == upload.id);
	if (oldUpload) oldUpload.progress = upload.progress;
};

export const setUploadStatus = (state, upload) => {
	let oldUpload = state.uploads.find((old) => old.id == upload.id);
	if (oldUpload) oldUpload.status = upload.status;
};
