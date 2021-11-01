<template>
	<main-layout>
		<Header />
		<b-container fluid class="px-xl-5 py-5">
			<div v-for="(category, i) in homePage.categories" :key="i" class="listening pb-5">
				<h3>{{ category.name }} :-</h3>
				<b-row>
					<b-col cols="10" offset="1" class="mt-3">
						<b-row cols="1" cols-md="2" cols-lg="3" class="justify-content-center">
							<b-col v-for="(course, i) in category.courses" :key="i" :class="{ 'mt-3 mt-md-0': i != 0, 'mt-md-3 mt-lg-0': !(i % 2) && i != 0 }">
								<CourseCard :course="course" />
							</b-col>
						</b-row>
					</b-col>
				</b-row>
			</div>
		</b-container>
	</main-layout>
</template>

<script>
	import Header from "@/components/home/Header";
	import CourseCard from "@/components/home/CourseCard";
	import MainLayout from "@/components/layouts/MainLayout.vue";
	export default {
		name: "Home",
		components: { Header, CourseCard, MainLayout },

		async mounted() {
			await this.$store.dispatch("getHomePage");

			this.$store.commit("setLoader", false);
		},
		computed: {
			homePage() {
				return this.$store.state.pages.home;
			}
		}
	};
</script>
