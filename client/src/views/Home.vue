<template>
	<div>
		<Header />
		<b-container fluid class="px-xl-5 py-5">
			<div v-for="(category, i) in homePage.categories" :key="i" class="listening pb-5">
				<h3>{{ category.name }} :-</h3>
				<b-row>
					<b-col cols="10" offset="1" class="mt-3">
						<b-row cols="3" class="justify-content-center">
							<b-col v-for="(course, i) in category.courses" :key="i">
								<CourseCard :course="course" />
							</b-col>
						</b-row>
					</b-col>
				</b-row>
			</div>
		</b-container>
	</div>
</template>

<script>
	import Header from "@/components/home/Header";
	import CourseCard from "@/components/home/CourseCard";
	export default {
		name: "Home",
		components: { Header, CourseCard },

		mounted() {
			this.$store.dispatch("getHomePage");
		},
		computed: {
			homePage() {
				return this.$store.state.pages.home;
			}
		}
	};
</script>

<style scoped lang="scss"></style>
