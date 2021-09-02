import Vue from "vue";
import VueRouter from "vue-router";
import { ADMIN, INSTRUCTOR, OWNER } from "../helpers/constants";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
		meta: { auth: false }
	},
	{
		path: "/login",
		name: "Login",
		component: () => import(/* webpackChunkName: "Login" */ "@/views/Auth/Login"),
		// component: require("@/views/Auth/Login").default,
		meta: { auth: false, only: [] }
	},
	{
		path: "/register",
		name: "Register",
		// component: require("@/views/Auth/Register").default,
		component: () => import(/* webpackChunkName: "Register" */ "@/views/Auth/Register"),
		meta: { auth: false, only: [] }
	},
	{
		path: "/course",
		name: "Course",
		// component: require("@/views/Course/index").default,
		component: () => import(/* webpackChunkName: "Course" */ "@/views/Course/index"),
		meta: { auth: false }
	},
	{
		path: "/dashboard",
		name: "Dashboard",
		// component: require("@/views/Dashboard/Dashboard").default,
		component: () => import(/* webpackChunkName: "Dashboard" */ "@/views/Dashboard/Dashboard"),
		meta: { dashboard: true, auth: true, only: [OWNER, ADMIN, INSTRUCTOR] }
	},
	{
		path: "/dashboard/courses",
		name: "Courses",
		// component: require("@/views/Dashboard/Course/index").default,
		component: () => import(/* webpackChunkName: "Courses" */ "@/views/Dashboard/Course/index"),
		meta: { dashboard: true, auth: true, only: [OWNER, ADMIN, INSTRUCTOR] }
	},
	{
		path: "/dashboard/courses/create",
		name: "CreateCourse",
		// component: require("@/views/Dashboard/Course/form").default,
		component: () => import(/* webpackChunkName: "CreateCourse" */ "@/views/Dashboard/Course/form"),
		meta: { dashboard: true, auth: true, only: [OWNER, ADMIN, INSTRUCTOR] }
	},
	{
		path: "/dashboard/courses/:courseId",
		name: "DashboardShowCourse",
		// component: require("@/views/Dashboard/Course/show").default,
		component: () => import(/* webpackChunkName: "CourseShow" */ "@/views/Dashboard/Course/show"),
		meta: { dashboard: true, auth: true, only: [OWNER, ADMIN, INSTRUCTOR] }
	},
	{
		path: "/dashboard/courses/:courseId/update",
		name: "UpdateCourse",
		// component: require("@/views/Dashboard/Course/form").default,
		component: () => import(/* webpackChunkName: "UpdateCourse" */ "@/views/Dashboard/Course/form"),
		meta: { dashboard: true, auth: true, only: [OWNER, ADMIN, INSTRUCTOR] }
	},
	{
		path: "/dashboard/students",
		name: "Students",
		// component: require("@/views/Dashboard/Student/index").default,
		component: () => import(/* webpackChunkName: "Students" */ "@/views/Dashboard/Student/index"),
		meta: { dashboard: true, auth: true, only: [OWNER, ADMIN] }
	},
	{
		path: "/dashboard/instructors",
		name: "Instructors",
		// component: require("@/views/Dashboard/Instructor/index").default,
		component: () => import(/* webpackChunkName: "Instructors" */ "@/views/Dashboard/Instructor/index"),
		meta: { dashboard: true, auth: true, only: [OWNER, ADMIN] }
	}
	// {
	//   path: "/about",
	//   name: "About",
	//   // route level code-splitting
	//   // this generates a separate chunk (about.[hash].js) for this route
	//   // which is lazy-loaded when the route is visited.
	//   component: () =>
	//     import(/* webpackChunkName: "about" */ "../views/About.vue"),
	// },
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
});

export default router;
