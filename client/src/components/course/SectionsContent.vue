<template>
	<div>
		<div class="d-flex align-items-center justify-content-between mb-2">
			<p class="mb-0 font-sm">
				{{ +course.sections.length }} sections • {{ lecturesCount }} lectures •
				{{ lecturesTime(course.time).timeStr }}
				total length
			</p>
			<b-btn size="sm" variant="teal" @click="expandAll" class="text-nowrap">
				<span v-if="allExpanded"> Collapse All </span>
				<span v-else> Expand All </span>
			</b-btn>
		</div>
		<div class="course-content-sections">
			<b-card no-body v-for="(section, i) in course.sections" :key="i">
				<b-card-body @click="section.lecturesVisible = !section.lecturesVisible" class="p-3 d-flex justify-content-between c-pointer">
					<div class="d-flex align-items-center" style="font-size: 12px">
						<b-icon :icon="`chevron-${section.lecturesVisible ? 'up' : 'down'}`" />
						<span class="mx-2 font-weight-600">{{ section.title }}</span>
					</div>
					<span class="font-sm d-flex flex-column text-right d-sm-inline-block">
						<span class="text-nowrap"> {{ section.lectures.length }} lectures </span>
						<span class="d-none d-sm-inline-block"> • </span>
						<span> {{ lecturesTime(section.time).timeStr }} </span>
					</span>
				</b-card-body>
				<b-collapse v-model="section.lecturesVisible">
					<b-card-footer class="p-0 border-0">
						<div class="d-flex align-items-center justify-content-between px-3 py-2" v-for="(lecture, i) in section.lectures" :key="i">
							<div style="font-size: 12px">
								<span style="font-size: 18px" class="">
									<b-icon
										icon="caret-right-fill"
										variant="white"
										class="rounded-circle bg-dark p-1 c-pointer"
										v-if="lecture.video"
										@click="showLectureVideo(lecture)"
									/>
									<b-icon icon="dash-circle" scale="2" variant="white" class="rounded-circle bg-dark p-1" v-else />
								</span>
								<span class="mx-2 text-primary c-pointer" style="text-decoration: underline" @click="showLectureVideo(lecture)" v-if="lecture.video">
									{{ lecture.title }}
								</span>
								<span class="mx-2" v-else>{{ lecture.title }}</span>
								<b-icon
									:icon="`chevron-${lecture.descriptionVisible ? 'up' : 'down'}`"
									variant="dark"
									class="c-pointer"
									@click="lecture.descriptionVisible = !lecture.descriptionVisible"
								/>
								<b-collapse v-model="lecture.descriptionVisible">
									<p class="text-muted pl-4 mt-1 mb-0">{{ lecture.description }}</p>
								</b-collapse>
							</div>
							<div>{{ lecturesTime(lecture.time).timeNum }}</div>
						</div>
					</b-card-footer>
				</b-collapse>
			</b-card>
		</div>
	</div>
</template>

<script>
	import { secondsToHms } from "@/helpers/functions";

	export default {
		data() {
			return {
				allExpanded: false
			};
		},

		watch: {
			allExpanded(v) {
				this.course?.sections?.forEach((section) => {
					section.lecturesVisible = v;
					if (!v) {
						section.lectures.forEach((lecture) => {
							lecture.descriptionVisible = v;
						});
					}
				});
			}
		},

		computed: {
			course() {
				return this.$store.state.Course.one;
			},

			lecturesCount() {
				return this.course?.sections?.reduce((total, section) => {
					total += section.lectures.length;
					return total;
				}, 0);
			}
		},

		methods: {
			expandAll() {
				this.allExpanded = !this.allExpanded;
			},

			lecturesTime(time) {
				return secondsToHms(time);
			},

			async showLectureVideo(lecture) {
				this.$store.commit("Course/setLecture", lecture);
				try {
					await this.$store.dispatch("Course/quiz");
				} catch (err) {
					//
				}
			}
		}
	};
</script>

<style lang="scss" scoped></style>
