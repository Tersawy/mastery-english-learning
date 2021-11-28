<template>
	<b-card no-body class="h-100" :header="`Quiz section: ${section.title}`" header-class="h5 font-weight-bold">
		<b-table
			hover
			responsive
			:sort-by.sync="sortBy"
			:sort-desc.sync="sortDesc"
			:per-page="perPage"
			:current-page="1"
			:items="studentsAnswers"
			:fields="fields"
			class="mb-3 text-center"
			stacked="md"
		>
			<template #cell(passRate)="row"> {{ row.item.quizAnswer ? parseInt(row.item.quizAnswer.passRate) : 0 }}% </template>
			<template #cell(attempts)="row">
				{{ row.item.quizAnswer ? row.item.quizAnswer.attempts : 0 }}
			</template>
			<template #cell(lastAttemptAt)="row">
				<span v-if="row.item.quizAnswer">{{ row.item.quizAnswer.lastAttemptAt | dateTime }}</span>
				<span v-else>--</span>
			</template>
		</b-table>

		<b-row cols="1" cols-md="6" class="mt-auto">
			<b-col>
				<b-pagination
					v-model="page"
					limit="3"
					:total-rows="course.studentsCount"
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
					{ key: "username", label: "Username" },
					{ key: "passRate", label: "Pass rate", tdClass: "align-middle text-center", thClass: "text-center" },
					{ key: "attempts", label: "Attempts" },
					{ key: "lastAttemptAt", label: "Last attempt at" }
				]
			};
		},

		computed: {
			course() {
				return this.$store.state.Course.detail;
			},

			section() {
				return this.$store.state.Course.oneSectionDetail;
			},

			studentsAnswers() {
				return this.section.quiz.studentsAnswers.map((answer) => ({
					...answer,
					_cellVariants: {
						passRate: !answer.quizAnswer || answer.quizAnswer.passRate < this.section.quiz.minimumPassRate ? "warning" : "",
						attempts: !answer.quizAnswer || answer.quizAnswer.attempts > 3 ? "danger" : ""
					}
				}));
			}
		},

		watch: {
			page() {
				this.getStudentsAnswers();
			}
		},

		methods: {
			async getStudentsAnswers() {
				let queries = `?page=${this.page}&per_page=${this.perPage}`;

				let sectionId = this.section._id;

				let quizId = this.section.quiz._id;

				try {
					await this.$store.dispatch("Course/getCourseDetailSectionQuizStudentsAnswers", { queries, sectionId, quizId });
				} catch (e) {
					//
				}
			}
		}
	};
</script>
