import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import "@fortawesome/fontawesome-free/js/all";
import "@fortawesome/fontawesome-free/css/all.css";

import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

import "@/assets/scss/main.scss";

import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

Vue.use(VueSweetalert2);

import vuelidate from "vuelidate";
Vue.use(vuelidate);

import store from "@/store";
Vue.prototype.$store = store;

import api from "@/plugins/api";
Vue.prototype.$api = api;

import uploader from "vue-simple-uploader";
Vue.use(uploader);

const DEFAULT_TITLE = "Mastery-english-learning";

router.beforeEach((to, from, next) => {
	store.commit("setLoader", true);

	window.scrollTo(0, 0);

	let user = store.state.Auth.user || {};

	let isAuth = Object.keys(user).length > 1;

	if (to.meta.auth && !isAuth) return next("/");

	let routeHasExcept = Array.isArray(to.meta.only);

	let userIsNotAllowed = routeHasExcept && !to.meta.only.includes(user.type);

	if (isAuth && userIsNotAllowed) return next("/");

	next();
});

router.afterEach((to) => {
	Vue.nextTick(() => {
		document.title = to.meta.title || store.state.Setting.settings.appName || DEFAULT_TITLE;
	});
});

import InputError from "@/components/InputError";
Vue.component("InputError", InputError);

import ErrorMixin from "@/mixins/errorMixin";
Vue.mixin(ErrorMixin);

import UserMixin from "@/mixins/userMixin";
Vue.mixin(UserMixin);

import "@/directives";
import "@/filters";

Vue.config.productionTip = false;

import io from "socket.io-client";

Vue.prototype.$socket = io.connect(`${process.env.VUE_APP_SERVER_URL}?token=${sessionStorage.getItem("token")}`);

new Vue({
	router,
	store,
	render: (h) => h(App)
}).$mount("#app");

store.dispatch("Auth/me");
store.dispatch("Setting/getSettings");

//https://www.facebook.com/Gam3aBookStore/
//https://www.facebook.com/printige/
