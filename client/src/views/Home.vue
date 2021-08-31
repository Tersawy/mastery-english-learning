<template>
	<div>
		<Header />
		<b-container fluid class="px-xl-5 py-5">
			<div class="listening">
				<h3>Listening :-</h3>
				<b-row>
					<b-col cols="10" offset="1" class="mt-3">
						<b-row cols="3" class="justify-content-center">
							<b-col>
								<CourseCard />
							</b-col>
							<b-col>
								<CourseCard />
							</b-col>
							<b-col>
								<CourseCard />
							</b-col>
						</b-row>
					</b-col>
				</b-row>
			</div>
			<div class="speaking pt-5">
				<h3>Speaking :-</h3>
				<b-row>
					<b-col cols="10" offset="1" class="mt-3">
						<b-row cols="3" class="justify-content-center">
							<b-col>
								<CourseCard />
							</b-col>
							<b-col>
								<CourseCard />
							</b-col>
							<b-col>
								<CourseCard />
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
		components: { Header, CourseCard }
	};
</script>

<style scoped lang="scss"></style>
