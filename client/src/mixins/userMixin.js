import { ADMIN, INSTRUCTOR, OWNER, STUDENT } from "../helpers/constants";

export default {
	computed: {
		me() {
			return this.$store.state.Auth.user;
		},

		isAuth() {
			return Object.keys(this.me).length;
		},

		isStudent() {
			return this.me.type == STUDENT;
		},

		isInstructor() {
			return this.me.type == INSTRUCTOR;
		},

		isAdmin() {
			return this.me.type == ADMIN;
		},

		isOwner() {
			return this.me.type == OWNER;
		},

		lecturesURL() {
			return process.env.VUE_APP_API_URL + "/lectures";
		},

		thumbnailsURL() {
			return process.env.VUE_APP_API_URL + "/thumbnails";
		}
	}
};
