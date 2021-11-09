import { ADMIN, INSTRUCTOR, OWNER, STUDENT } from "@/helpers/constants";

export default {
	data() {
		return {
			isLoading: false
		};
	},
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

		API_URL() {
			return process.env.VUE_APP_API_URL;
		},

		lecturesURL() {
			return process.env.VUE_APP_API_URL + "/lectures";
		},

		thumbnailsURL() {
			return process.env.VUE_APP_API_URL + "/thumbnails";
		},

		userImageURL() {
			return process.env.VUE_APP_API_URL + "/user-image";
		},

		appLogo() {
			return `${this.API_URL}/settings-images/${this.$store.state.Setting.settings.logoDark}`;
		}
	},

	methods: {
		setLoading(value) {
			this.isLoading = value;
		}
	}
};
