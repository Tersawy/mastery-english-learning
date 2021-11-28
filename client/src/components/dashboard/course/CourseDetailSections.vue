<template>
	<b-card no-body class="h-100" header="Sections" header-class="h5 font-weight-bold">
		<b-table
			hover
			responsive
			:sort-by.sync="sortBy"
			:sort-desc.sync="sortDesc"
			:per-page="perPage"
			:current-page="page"
			:items="sections"
			:fields="fields"
			class="mb-3 text-center"
			stacked="md"
		>
			<template #cell(title)="row">
				{{ row.value | wordtruncate(5) }}
			</template>

			<template #cell(lecturesCount)="row">
				{{ row.value || 0 }}
			</template>

			<template #cell(hasQuiz)="row">
				{{ row.value ? "Yes" : "No" }}
			</template>

			<template #cell(actions)="row">
				<b-overlay :show="row.item.quizBtnLoading" rounded opacity="0.6" size="sm" spinner-small spinner-variant="success">
					<b-btn size="sm" v-if="row.item.hasQuiz" variant="outline-success" @click="getQuiz(row.item)">Quiz</b-btn>
				</b-overlay>
				<!-- <span class="w-50 d-inline-block text-left">
					<b-overlay :show="row.item.lecturesBtnLoading" rounded opacity="0.6" size="sm" spinner-small spinner-variant="blue" class="d-inline-block">
						<b-btn size="sm" :disabled="row.item.lecturesBtnLoading" @click="getLectures(row.item)" v-if="row.item.lecturesCount" variant="outline-blue">
							Lectures
						</b-btn>
					</b-overlay>
				</span> -->
			</template>
		</b-table>

		<b-row cols="1" cols-md="6" class="mt-auto">
			<b-col>
				<b-pagination
					v-model="page"
					limit="3"
					:total-rows="course.sectionsCount"
					:per-page="perPage"
					align="fill"
					size="sm"
					class="pagination mt-auto px-2"
					pills
				></b-pagination>
			</b-col>
		</b-row>
	</b-card>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				perPage: 5,
				sortBy: "createdAt",
				sortDesc: true,
				fields: [
					{ key: "title", label: "Title", tdClass: "text-left", thClass: "text-left" },
					{ key: "lecturesCount", label: "Lectures Count" },
					{ key: "hasQuiz", label: "Quiz", tdClass: "align-middle text-center", thClass: "text-center" },
					{ key: "actions", label: "Actions", thClass: "text-center" }
				]
			};
		},

		computed: {
			course() {
				return this.$store.state.Course.detail;
			},

			sections() {
				return this.course.sections.map((section) => ({
					...section,
					lecturesBtnLoading: false,
					quizBtnLoading: false,
					_cellVariants: {
						hasQuiz: section.hasQuiz ? "" : "warning",
						lecturesCount: +section.lecturesCount > 0 ? "" : "danger"
					}
				}));
			}
		},

		methods: {
			async getLectures(section) {
				section.lecturesBtnLoading = true;
				try {
					await this.$store.dispatch("Course/getCourseDetailLectures", section._id);
				} catch (err) {
					//
				} finally {
					section.lecturesBtnLoading = false;
				}
			},

			async getQuiz(section) {
				section.quizBtnLoading = true;
				try {
					await this.$store.dispatch("Course/getCourseDetailSectionQuiz", section._id);
				} catch (e) {
					//
				}
				section.quizBtnLoading = false;
			}
		}
	};
</script>
