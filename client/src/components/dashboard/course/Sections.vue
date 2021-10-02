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
						<span class="font-sm text-nowrap mr-2"> {{ section.lectures.length }} lectures </span>

						<b-dropdown variant="link" toggle-class="text-decoration-none p-0 text-dark" no-caret>
							<template #button-content>
								<b-icon @click="showSectionActions(section)" icon="three-dots-vertical" scale="1.3" class="c-pointer"></b-icon>
							</template>

							<b-dropdown-item link-class="py-2 d-flex align-items-center" @click="createLecture(section)">
								<b-icon icon="folder-check" scale="0.8"></b-icon>
								<span class="mx-2 text-muted">Add Lecture</span>
							</b-dropdown-item>

							<b-dropdown-item link-class="py-2 d-flex align-items-center" v-b-modal.sectionForm>
								<b-icon icon="pencil-square" scale="0.8"></b-icon>
								<span class="mx-2 text-muted">Update Section</span>
							</b-dropdown-item>

							<hr class="m-0" />

							<b-dropdown-item link-class="py-2 d-flex align-items-center text-danger" v-b-modal.removeSectionModal>
								<b-icon icon="trash" scale="0.8"></b-icon>
								<span class="mx-2 text-muted">Delete Section</span>
							</b-dropdown-item>
						</b-dropdown>
					</div>
				</b-card-body>

				<b-collapse v-model="section.lecturesVisible">
					<b-card-footer class="p-0 border-0">
						<div class="d-flex align-items-baseline justify-content-between p-3 font-md" v-for="(lecture, i) in section.lectures" :key="i">
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
									<p class="text-muted pl-4 mt-1 mb-0 font-md" v-html="lecture.description"></p>
								</b-collapse>
							</div>

							<div class="c-pointer d-flex align-items-center">
								<b-form-checkbox
									v-b-tooltip="(lecture.videoReview ? 'Disable' : 'Enable') + ' Video Review'"
									v-model="lecture.videoReview"
									@change="changeVideoReview(lecture, section)"
									class="ml-2 c-pointer"
									switch
								></b-form-checkbox>

								<b-dropdown variant="link" toggle-class="text-decoration-none p-0 text-dark" no-caret>
									<template #button-content>
										<b-icon @click="showLectureActions(lecture, section)" icon="three-dots-vertical" scale="1.5" class="c-pointer"></b-icon>
									</template>

									<b-dropdown-item link-class="py-2 d-flex align-items-center" @click="showQuiz">
										<b-icon icon="file-earmark-spreadsheet" scale="0.8"></b-icon>
										<span class="mx-2 text-muted">Show Quiz</span>
									</b-dropdown-item>

									<b-dropdown-item link-class="py-2 d-flex align-items-center" v-if="lecture.video" @click="changeLectureVideo">
										<b-icon icon="arrow-repeat" scale="0.8"></b-icon>
										<span class="mx-2 text-muted">Change Lecture Video</span>
									</b-dropdown-item>

									<b-dropdown-item link-class="py-2 d-flex align-items-center" v-else v-b-modal.lectureVideoForm>
										<b-icon icon="plus-circle" scale="0.8"></b-icon>
										<span class="mx-2 text-muted">Create Lecture Video</span>
									</b-dropdown-item>

									<b-dropdown-item link-class="py-2 d-flex align-items-center" v-b-modal.lectureForm>
										<b-icon icon="pencil-square" scale="0.8"></b-icon>
										<span class="mx-2 text-muted">Update Lecture</span>
									</b-dropdown-item>

									<hr class="m-0" />

									<b-dropdown-item link-class="py-2 d-flex align-items-center text-danger" v-b-modal.removeLectureModal>
										<b-icon icon="trash" scale="0.8"></b-icon>
										<span class="mx-2 text-muted">Delete Lecture</span>
									</b-dropdown-item>
								</b-dropdown>
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
			showLectureActions(lecture, section) {
				this.$store.commit("Course/setLecture", lecture);
				this.$store.commit("Course/setSection", section);
			},
			showSectionActions(section) {
				this.$store.commit("Course/setSection", section);
			},
			createSection() {
				this.$store.commit("Course/setSection", {});
				this.$bvModal.show("sectionForm");
			},
			createLecture(section) {
				this.$store.commit("Course/setSection", section);
				this.$store.commit("Course/setLecture", {});
				this.$bvModal.show("lectureForm");
			},
			showLectureVideo(lecture) {
				this.$store.commit("Course/setLecture", lecture);
				this.$bvModal.show("lectureVideo");
			},
			changeLectureVideo() {
				this.isChangeVideo = true;
				this.$nextTick(() => {
					this.$bvModal.show("lectureVideoForm");
				});
			},
			async showQuiz() {
				try {
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
			},
			async changeVideoReview(lecture, section) {
				this.$store.commit("Course/setSection", section);
				this.$store.commit("Course/setLecture", lecture);
				try {
					await this.$store.dispatch("Course/changeLectureVideoReview", { videoReview: lecture.videoReview });

					let msg = `Lecture video has been ${lecture.videoReview ? "enabled" : "disabled"} sucessfully.`;

					this.setGlobalSuccess(msg);
				} catch (err) {
					//
				}
			}
		}
	};
</script>

<style lang="scss">
	.custom-control.custom-switch {
		label,
		label:before,
		label:after {
			cursor: pointer;
		}
	}
</style>
