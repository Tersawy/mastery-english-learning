<template>
	<dashboard-layout class="courses">
		<b-breadcrumb class="bg-white border rounded shadow-sm font-weight-600 mb-30px">
			<b-breadcrumb-item to="/dashboard">
				<b-icon class="mr-1" icon="house-fill" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
				Dashboard
			</b-breadcrumb-item>
			<b-breadcrumb-item to="/dashboard/courses"> Courses </b-breadcrumb-item>
			<b-breadcrumb-item active> {{ course.title }} </b-breadcrumb-item>
		</b-breadcrumb>

		<b-row cols="1" cols-md="3">
			<b-col class="mb-4 mb-lg-0">
				<report-card name="Number of Sections" icon="collection" :number="course.sectionsCount" />
			</b-col>
			<b-col class="mb-4 mb-lg-0">
				<report-card name="Number of Lectures" icon="bricks" :number="course.lecturesCount" />
			</b-col>
			<b-col class="mb-4 mb-lg-0">
				<report-card name="Number of Students" icon="people" :number="course.studentsCount" />
			</b-col>
		</b-row>

		<b-row class="mt-lg-30px">
			<b-col lg="8" md="12" order="2" order-lg="1" class="mt-30px mt-lg-0">
				<CourseDetailSections />
			</b-col>
			<b-col lg="4" md="12" order="1" order-lg="2">
				<CourseDetailStudents />
			</b-col>
			<b-col cols="12" class="mt-30px" order="3" v-if="oneSectionDetail.quiz._id">
				<CourseDetailSectionQuiz />
			</b-col>
			<b-col cols="12" class="mt-30px" order="3" v-if="oneSectionDetail.lectures.length">
				<CourseDetailLectures />
			</b-col>
		</b-row>
	</dashboard-layout>
</template>

<script>
	import ReportCard from "@/components/dashboard/ReportCard";
	import DashboardLayout from "@/components/layouts/DashboardLayout.vue";
	import { asyncHandler } from "@/helpers/functions";
	import CourseDetailStudents from "@/components/dashboard/course/CourseDetailStudents.vue";
	import CourseDetailSections from "@/components/dashboard/course/CourseDetailSections.vue";
	import CourseDetailLectures from "@/components/dashboard/course/CourseDetailLectures.vue";
	import CourseDetailSectionQuiz from "@/components/dashboard/course/CourseDetailSectionQuiz.vue";
	export default {
		components: { DashboardLayout, ReportCard, CourseDetailStudents, CourseDetailSections, CourseDetailLectures, CourseDetailSectionQuiz },

		data() {
			return {
				namespace: "Course"
			};
		},

		async mounted() {
			if (!this.$route.params.courseId) {
				return this.$router.push("/dashboard/courses");
			}

			asyncHandler(this.getCourseDetail, (err) => {
				if (err) return this.$router.push("/dashboard/courses");
				this.$store.commit("setLoader", false);
			});
		},

		computed: {
			course() {
				return this.$store.state.Course.detail;
			},

			oneSectionDetail() {
				return this.$store.state.Course.oneSectionDetail;
			}
		},

		methods: {
			getCourseDetail() {
				return this.$store.dispatch("Course/getCourseDetail", this.$route.params.courseId);
			}
		}
	};
</script>
