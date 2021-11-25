<template>
	<b-card no-body class="h-100" header="Students" header-class="h5 font-weight-bold">
		<b-table
			hover
			responsive
			@context-changed="contextChanged"
			:sort-by.sync="sortBy"
			:sort-desc.sync="sortDesc"
			:per-page="perPage"
			:current-page="1"
			:items="course.students"
			:fields="fields"
			class="mb-3"
			thead-class="d-none"
			size="sm"
		>
			<template #cell(image)="row">
				<b-avatar :src="`${userImageURL}/${row.value}`" size="2.2rem"></b-avatar>
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
					{ key: "image", label: "Image" },
					{ key: "username", label: "Name", tdClass: "align-middle" }
				]
			};
		},

		computed: {
			course() {
				return this.$store.state.Course.detail;
			},
			sortDir() {
				return this.sortDesc ? "desc" : "asc";
			}
		},

		watch: {
			page() {
				this.finallData();
			},
			perPage() {
				this.page = 1;
			}
		},

		methods: {
			contextChanged(ctx) {
				this.sortBy = ctx.sortBy;
				this.sortDesc = ctx.sortDesc;
				this.finallData();
			},

			finallData() {
				this.tableIsBusy = true;

				this.getStudents();

				this.$nextTick(() => {
					this.tableIsBusy = false;
				});
			},

			getStudents() {
				let queries = `?page=${this.page}&per_page=${this.perPage}&sort_by=${this.sortBy}&sort_dir=${this.sortDir}`;

				this.$store.dispatch("Course/getCourseDetailStudents", queries);
			}
		}
	};
</script>

<style lang="scss" scoped></style>
