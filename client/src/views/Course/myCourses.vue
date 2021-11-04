<template>
	<main-layout>
		<Header />
		<b-container fluid class="px-xl-5 py-5">
			<b-row class="justify-content-md-center">
				<b-col md="4" lg="3">
					<b-card class="shadow text-center" body-class="py-3">
						<span class="mb-0 h4 font-weight-600 text-dark" style="letter-spacing: 0.9px" ref="myCourses"> My Courses </span>
					</b-card>
				</b-col>
			</b-row>
			<b-row class="mt-4">
				<b-col class="mt-3" cols="12" offset-xl="1" xl="10" v-for="(course, i) in myCourses" :key="i">
					<CardCourse :course="course" />
				</b-col>
			</b-row>
		</b-container>
	</main-layout>
</template>

<script>
	import Header from "@/components/home/Header.vue";
	import CardCourse from "@/components/cards/CardCourse.vue";
	import MainLayout from "@/components/layouts/MainLayout.vue";
	import { asyncHandler } from "@/helpers/functions";
	export default {
		components: { MainLayout, Header, CardCourse },

		async mounted() {
			asyncHandler(this.getMyCourses, () => {
				this.$store.commit("setLoader", false);
			});

			let rect = this.$refs.myCourses.getBoundingClientRect();

			window.scrollTo({ top: rect.top + window.scrollY, behavior: "smooth" });
		},

		computed: {
			myCourses() {
				return this.$store.state.Course.myCourses.docs;
			}
		},

		methods: {
			getMyCourses() {
				return this.$store.dispatch("Course/myCourses");
			}
		}
	};
</script>
