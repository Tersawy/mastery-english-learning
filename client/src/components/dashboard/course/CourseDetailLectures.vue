<template>
	<b-card no-body class="h-100" :header="`Lectures section: ${section.title}`" header-class="h5 font-weight-bold" v-if="section._id">
		<b-table
			hover
			responsive
			:sort-by.sync="sortBy"
			:sort-desc.sync="sortDesc"
			:per-page="perPage"
			:current-page="page"
			:items="lectures"
			:fields="fields"
			class="mb-3 text-center"
			stacked="md"
		>
			<template #cell(title)="row">
				{{ row.value | wordtruncate(5) }}
			</template>

			<template #cell(hasVideo)="row">
				{{ row.value ? "Yes" : "No" }}
			</template>

			<template #cell(hasQuiz)="row">
				{{ row.value ? "Yes" : "No" }}
			</template>

			<template #cell(actions)="row">
				<span class="w-50 d-inline-block text-left">
					<b-overlay :show="row.item.quizBtnLoading" rounded opacity="0.6" size="sm" spinner-small spinner-variant="blue" class="d-inline-block">
						<b-btn size="sm" :disabled="row.item.quizBtnLoading" @click="getQuiz(row.item)" v-if="row.item.hasQuiz" variant="outline-blue"> Quiz </b-btn>
					</b-overlay>
				</span>
			</template>
		</b-table>

		<b-row cols="1" cols-md="6" class="mt-auto">
			<b-col>
				<b-pagination
					v-model="page"
					limit="3"
					:total-rows="section.lecturesCount"
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
					{ key: "hasVideo", label: "Video" },
					{ key: "hasQuiz", label: "Quiz", tdClass: "align-middle text-center", thClass: "text-center" },
					{ key: "actions", label: "Actions", tdClass: "align-middle text-left", thClass: "text-center" }
				]
			};
		},

		computed: {
			section() {
				return this.$store.state.Course.oneSectionDetail;
			},

			lectures() {
				return this.section.lectures.map((lecture) => ({
					...lecture,
					quizBtnLoading: false,
					_cellVariants: {
						hasQuiz: lecture.hasQuiz ? "" : "warning",
						hasVideo: lecture.hasVideo ? "" : "danger"
					}
				}));
			}
		},
		// ns1.digitalocean.com.
		methods: {
			async getQuiz(lecture) {
				lecture.quizBtnLoading = true;
				try {
					await this.$store.dispatch("Course/getCourseDetailLectureQuiz", lecture._id);
				} catch (err) {
					//
				} finally {
					lecture.quizBtnLoading = false;
				}
			}
		}
	};
</script>

<style lang="scss" scoped></style>
