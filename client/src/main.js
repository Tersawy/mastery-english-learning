import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import "@fortawesome/fontawesome-free/js/all";
import "@fortawesome/fontawesome-free/css/all.css";

import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

import "@/assets/scss/main.scss";

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
	let user = store.state.Auth.user || {};

	let isAuth = Object.keys(user).length > 1;

	if (to.meta.auth && !isAuth) return next("/login");

	let routeHasExcept = Array.isArray(to.meta.only);

	let userIsNotAllowed = routeHasExcept && !to.meta.only.includes(user.type);

	if (isAuth && userIsNotAllowed) return next("/dashboard");

	next();
});

router.afterEach((to) => {
	Vue.nextTick(() => {
		document.title = to.meta.title || DEFAULT_TITLE;
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

new Vue({
	router,
	store,
	render: (h) => h(App)
}).$mount("#app");

let meta = router.history.current.meta;

if (meta.auth) {
	store.dispatch("Auth/me");
}
