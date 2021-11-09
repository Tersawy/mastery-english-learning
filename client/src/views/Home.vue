<template>
	<main-layout>
		<Header />
		<b-container fluid>
			<b-card class="mt-5 text-center shadow-sm">
				<h1 class="mb-0">Our Courses</h1>
			</b-card>
		</b-container>
		<b-container fluid class="px-xl-5 py-5">
			<div v-for="(category, i) in homePage.categories" :key="i" class="listening pb-5">
				<b-row class="justify-content-center">
					<b-col cols="7" sm="6" md="4" xl="3">
						<b-card no-body class="p-3 text-center shadow-sm">
							<h4 class="mb-0">{{ category.name }}</h4>
						</b-card>
					</b-col>
				</b-row>
				<b-row cols="1" cols-md="2" cols-xl="3" class="mt-4">
					<b-col v-for="(course, i) in category.courses" :key="i" class="mb-4">
						<CardCourse :description="false" img-top :course="{ ...course, category: { _id: category._id, name: category.name } }" />
					</b-col>
				</b-row>
			</div>
		</b-container>
	</main-layout>
</template>

<script>
	import Header from "@/components/home/Header";
	import CardCourse from "@/components/cards/CardCourse.vue";
	import MainLayout from "@/components/layouts/MainLayout.vue";
	export default {
		name: "Home",
		components: { Header, CardCourse, MainLayout },

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
