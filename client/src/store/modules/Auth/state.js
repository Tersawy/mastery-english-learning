const state = {
	user: sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : {},
	token: sessionStorage.getItem("token"),
	permission: {},
	errors: {}
};

export default state;
