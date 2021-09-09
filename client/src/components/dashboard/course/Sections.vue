<template>
	<b-modal id="sections" hide-footer @hidden="$emit('closed')" size="lg" body-class="p-0">
		<template #modal-header="{ close }">
			<div class="d-flex align-items-center justify-content-between w-100">
				<div class="d-flex align-items-center">
					<h5 class="mb-0 font-weight-bold">Sections</h5>
				</div>
				<b-button size="sm" variant="outline-danger" @click="close()"> Close </b-button>
			</div>
		</template>
		<div class="course-content-sections">
			<p class="mb-0 lead text-center py-3" v-if="course.sections && course.sections.length == 0">
				<span>There's no sections to show, </span>
				<span class="text-blue c-pointer" style="text-decoration: underline" @click="createSection">Create section</span>
			</p>
			<b-card no-body v-for="(section, i) in course.sections" :key="i">
				<b-card-body class="p-3 d-flex justify-content-between">
					<div @click="$store.commit('Course/toggleLectures', section)" class="d-flex align-items-center c-pointer">
						<b-icon :icon="`chevron-${section.lecturesVisible ? 'up' : 'down'}`" />
						<span class="mx-2 font-weight-500">{{ section.title }}</span>
					</div>
					<div class="d-flex justify-content-center align-items-center">
						<div class="c-pointer">
							<b-icon icon="folder-check" v-b-tooltip="`Add Lecture`" scale="1.2" variant="orange" @click="createLecture(section)"></b-icon>
							<b-icon icon="pencil-square" v-b-tooltip="`Update Section`" scale="1.2" variant="success" class="mx-3" @click="updateSection(section)"></b-icon>
							<b-icon icon="trash" v-b-tooltip="`Delete Section`" scale="1.2" variant="danger" class="mr-3" @click="removeSection(section)"></b-icon>
						</div>
						<span class="font-sm text-nowrap"> {{ section.lectures.length }} lectures </span>
					</div>
				</b-card-body>
				<b-collapse v-model="section.lecturesVisible">
					<b-card-footer class="p-0 border-0">
						<div class="d-flex align-items-center justify-content-between p-3 font-md" v-for="(lecture, i) in section.lectures" :key="i">
							<div>
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
									<p class="text-muted pl-4 mt-1 mb-0 font-md">{{ lecture.description }}</p>
								</b-collapse>
							</div>
							<div class="c-pointer">
								<b-icon icon="file-earmark-spreadsheet" v-b-tooltip="`Quiz`" scale="1.2" variant="primary" class="mr-3" @click="showQuiz(lecture)"></b-icon>
								<b-icon
									icon="arrow-repeat"
									v-b-tooltip="`Change Video`"
									scale="1.2"
									variant="blue"
									@click="changeLectureVideo(lecture, section)"
									v-if="lecture.video"
								/>
								<b-icon icon="plus-circle" variant="blue" @click="createLectureVideo(lecture, section)" v-else />
								<b-icon icon="pencil-square" v-b-tooltip="`Update Lecture`" scale="1.2" variant="success" class="mx-3" @click="updateLecture(lecture, section)" />
								<b-icon icon="trash" v-b-tooltip="`Delete Lecture`" scale="1.2" variant="danger" class="mr-3" @click="removeLecture(lecture, section)" />
							</div>
						</div>
					</b-card-footer>
				</b-collapse>
			</b-card>
		</div>
		<LectureForm />
		<LectureVideoForm :is-change="isChangeVideo" @closed="isChangeVideo = false" />
		<LectureVideo />
		<Quiz />
		<DeleteFieldModal msg="Are you sure to delete this section ?" @done="handleRemoveSection" modal-id="removeSectionModal" />
		<DeleteFieldModal msg="Are you sure to delete this lecture ?" @done="handleRemoveLecture" modal-id="removeLectureModal" />
	</b-modal>
</template>

<script>
	import LectureForm from "@/components/dashboard/course/LectureForm.vue";
	import Quiz from "@/components/dashboard/course/Quiz.vue";
	import LectureVideo from "@/components/dashboard/course/LectureVideo.vue";
	import LectureVideoForm from "@/components/dashboard/course/LectureVideoForm.vue";
	import DeleteFieldModal from "@/components/DeleteFieldModal.vue";
	export default {
		components: { LectureForm, LectureVideo, LectureVideoForm, Quiz, DeleteFieldModal },

		data() {
			return {
				isChangeVideo: false
			};
		},

		computed: {
			course() {
				return this.$store.state.Course.one;
			},
			section() {
				return this.$store.state.Course.oneSection;
			},
			lecture() {
				return this.$store.state.Course.oneLecture;
			}
		},

		methods: {
			createSection() {
				this.$store.commit("Course/setSection", {});
				this.$bvModal.show("sectionForm");
			},
			updateSection(section) {
				this.$store.commit("Course/setSection", section);
				this.$bvModal.show("sectionForm");
			},
			removeSection(section) {
				this.$store.commit("Course/setSection", section);
				this.$bvModal.show("removeSectionModal");
			},
			createLecture(section) {
				this.$store.commit("Course/setSection", section);
				this.$store.commit("Course/setLecture", {});
				this.$bvModal.show("lectureForm");
			},
			updateLecture(lecture, section) {
				this.$store.commit("Course/setSection", section);
				this.$store.commit("Course/setLecture", lecture);
				this.$bvModal.show("lectureForm");
			},
			removeLecture(lecture, section) {
				this.$store.commit("Course/setSection", section);
				this.$store.commit("Course/setLecture", lecture);
				this.$bvModal.show("removeLectureModal");
			},
			showLectureVideo(lecture) {
				this.$store.commit("Course/setLecture", lecture);
				this.$bvModal.show("lectureVideo");
			},
			createLectureVideo(lecture, section) {
				this.$store.commit("Course/setSection", section);
				this.$store.commit("Course/setLecture", lecture);
				this.$bvModal.show("lectureVideoForm");
			},
			changeLectureVideo(lecture, section) {
				this.isChangeVideo = true;
				this.$store.commit("Course/setSection", section);
				this.$store.commit("Course/setLecture", lecture);
				this.$nextTick(() => {
					this.$bvModal.show("lectureVideoForm");
				});
			},
			async showQuiz(lecture) {
				try {
					this.$store.commit("Course/setLecture", lecture);

					await this.$store.dispatch("Course/quiz");
				} catch (err) {
					//
				}

				this.$nextTick(() => {
					this.$bvModal.show("quiz");
				});
			},
			async handleRemoveSection() {
				try {
					let res = await this.$store.dispatch("Course/removeSection", this.section);
					this.setGlobalSuccess(res.msg);
				} catch (err) {
					//
				}
				this.$bvModal.hide("removeSectionModal");
			},
			async handleRemoveLecture() {
				try {
					let res = await this.$store.dispatch("Course/removeLecture", this.lecture);
					this.setGlobalSuccess(res.msg);
				} catch (err) {
					//
				}
				this.$bvModal.hide("removeLectureModal");
			}
		}
	};
</script>
