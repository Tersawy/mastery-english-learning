<template>
	<main-layout>
		<Header />
		<b-container fluid class="px-xl-5">
			<b-row class="my-5">
				<b-col cols="3">
					<b-card class="shadow-sm" body-class="py-3">
						<span class="mb-0 h5">My Courses</span>
					</b-card>
				</b-col>
				<b-col cols="12"> </b-col>
			</b-row>
		</b-container>
	</main-layout>
</template>

<script>
	import Header from "@/components/home/Header.vue";
	import MainLayout from "@/components/layouts/MainLayout.vue";

	export default {
		components: { Header, MainLayout },

		async mounted() {
			await this.getMyCourses();

			this.$store.commit("setLoader", false);
		},

		computed: {
			myCourses() {
				return this.$store.state.Course.myCourses;
			}
		},

		methods: {
			getMyCourses() {
				return this.$store.dispatch("Course/myCourses");
			}
		}
	};
</script>
