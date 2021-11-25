<template>
	<dashboard-layout class="courses">
		<b-breadcrumb class="bg-white border rounded shadow-sm font-weight-600 mb-30px">
			<b-breadcrumb-item to="/dashboard">
				<b-icon class="mr-1" icon="house-fill" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
				Dashboard
			</b-breadcrumb-item>
			<b-breadcrumb-item active> Courses </b-breadcrumb-item>
		</b-breadcrumb>

		<b-row class="mb-30px">
			<b-col cols="4">
				<b-form-group class="mb-0">
					<b-input-group>
						<b-form-input placeholder="Search in Courses" v-model="search" />
						<b-input-group-append>
							<b-btn variant="blue">
								<i class="fas fa-filter"></i>
							</b-btn>
						</b-input-group-append>
					</b-input-group>
				</b-form-group>
			</b-col>
			<b-col class="text-right">
				<b-btn variant="primary" class="d-inline-flex align-items-center" :to="{ name: 'CreateCourse' }">
					<b-icon icon="plus" scale="1.3" class="mr-1"></b-icon>
					Create
				</b-btn>
			</b-col>
		</b-row>

		<b-modal id="dropdownActionModal" hide-header hide-footer body-class="p-0" centered size="sm">
			<ul class="m-0 p-0 list-unstyled">
				<b-dropdown-item link-class="py-2 d-flex align-items-center" :to="{ name: `DashboardCourseDetail`, params: { courseId: course._id } }">
					<b-icon icon="eye" scale="0.8"></b-icon>
					<span class="mx-2 text-muted">Show Details</span>
				</b-dropdown-item>

				<b-dropdown-item link-class="py-2 d-flex align-items-center" :to="{ name: `UpdateCourse`, params: { courseId: course._id } }">
					<b-icon icon="pencil-square" scale="0.8"></b-icon>
					<span class="mx-2 text-muted">Edit Course</span>
				</b-dropdown-item>

				<b-dropdown-item link-class="py-2 d-flex align-items-center" v-b-modal.approveFieldModal>
					<template v-if="courseIsApproved">
						<b-icon icon="x-square" scale="0.8"></b-icon>
						<span class="mx-2 text-muted">Refusal to approve Course</span>
					</template>
					<template v-else>
						<b-icon icon="check-square" scale="0.8"></b-icon>
						<span class="mx-2 text-muted">Approve Course</span>
					</template>
				</b-dropdown-item>

				<b-dropdown-item link-class="py-2 d-flex align-items-center" @click="showSections(course)">
					<b-icon icon="collection" scale="0.8"></b-icon>
					<span class="mx-2 text-muted">Show Sections</span>
				</b-dropdown-item>

				<b-dropdown-item link-class="py-2 d-flex align-items-center" @click="createSection(course)">
					<b-icon icon="plus-circle" scale="0.8"></b-icon>
					<span class="mx-2 text-muted">Create Section</span>
				</b-dropdown-item>

				<hr class="m-0" />

				<b-dropdown-item link-class="py-2 d-flex align-items-center text-danger" v-b-modal.deleteCourseModal>
					<b-icon icon="trash" scale="0.8"></b-icon>
					<span class="mx-2 text-muted">Delete Course</span>
				</b-dropdown-item>
			</ul>
		</b-modal>

		<b-table
			show-empty
			stacked="lg"
			responsive
			hover
			sort-icon-left
			:busy="tableIsBusy"
			:items="items"
			:fields="fields"
			:current-page="1"
			:per-page="perPage"
			:sort-by.sync="sortBy"
			:sort-desc.sync="sortDesc"
			@context-changed="contextChanged"
			:filter="search"
			:filter-function="() => items"
			class="bg-white shadow-sm mt-3 mb-0"
		>
			<template #cell(actions)="row">
				<b-icon @click="showActions(row.item)" icon="three-dots-vertical" scale="1.5" class="c-pointer"></b-icon>
			</template>

			<template #cell(thumbnail)="row">
				<b-avatar :src="`${thumbnailsURL}/${row.value}`" :alt="row.value" class="shadow-sm" rounded="lg"></b-avatar>
			</template>

			<template #cell(title)="row">
				<span v-b-tooltip="row.value">
					{{ row.value | strLength(30) }}
				</span>
			</template>

			<template #cell(status)="row">
				<span v-course-status="row.value"></span>
			</template>
		</b-table>

		<b-row class="pt-3">
			<b-col sm="6" md="6" lg="4">
				<div class="d-flex align-items-center">
					<b-card body-class="d-flex align-items-center py-0 px-3" class="rounded-pill">
						<span class="text-muted">Rows per page: </span>
						<b-form-group class="mb-0">
							<b-form-select v-model="perPage" :options="perPageOptions" class="bg-transparent border-0 shadow-none"></b-form-select>
						</b-form-group>
					</b-card>
				</div>
			</b-col>
			<b-col sm="6" md="6" lg="4" class="ml-auto">
				<b-pagination v-model="page" :total-rows="docsCount" :per-page="perPage" align="fill" size="md" class="pagination" pills></b-pagination>
			</b-col>
		</b-row>
		<Sections />
		<SectionForm />
		<ApproveFieldModal :msg="approveMsg" @done="changeStatusCourse" />
		<DeleteFieldModal msg="Are you sure to delete this course ?" @done="removeCourse" modal-id="deleteCourseModal" />
	</dashboard-layout>
</template>

<script>
	import Sections from "@/components/dashboard/course/Sections";
	import SectionForm from "@/components/dashboard/course/SectionForm";
	import dataTableMixin from "@/mixins/dataTableMixin";
	import ApproveFieldModal from "@/components/ApproveFieldModal.vue";
	import DeleteFieldModal from "@/components/DeleteFieldModal.vue";
	import DashboardLayout from "@/components/layouts/DashboardLayout.vue";
	import { COURSE_APPROVED } from "@/helpers/constants";
	export default {
		mixins: [dataTableMixin],

		components: { DashboardLayout, Sections, SectionForm, ApproveFieldModal, DeleteFieldModal },

		data() {
			return {
				namespace: "Course",
				fields: [
					{ key: "thumbnail", lable: "Title", sortable: true },
					{ key: "title", lable: "Title", sortable: true },
					{ key: "status", lable: "Status", sortable: true },
					{ key: "category", lable: "Category", sortable: true },
					{ key: "studentsCount", lable: "Students Count", sortable: true, tdClass: "pl-xl-5" },
					{ key: "level", lable: "Level", sortable: true },
					{ key: "langMadeIn", lable: "Language Made In", sortable: true },
					{ key: "createdBy", lable: "Created By", sortable: true },
					{ key: "actions", lable: "Actions" }
				],
				course: {}
			};
		},

		computed: {
			courseIsApproved() {
				return this.course.status === COURSE_APPROVED;
			},

			approveMsg() {
				if (this.courseIsApproved) return "Are you sure to Refusal to approve this course ?";
				return "Are you sure to Approve this course ?";
			}
		},

		methods: {
			async showSections(course) {
				try {
					this.$store.commit("Course/setOne", course);

					await this.$store.dispatch("Course/sections");
				} catch (err) {
					//
				}

				this.$nextTick(() => {
					this.$bvModal.show("sections");
				});
			},

			createSection(course) {
				this.$store.commit("Course/setOne", course);
				this.$store.commit("Course/setSection", {});
				this.$bvModal.show("sectionForm");
			},

			showActions(course) {
				this.course = course;
				this.$bvModal.show("dropdownActionModal");

				// this.$refs[row.index].show()
			},

			async changeStatusCourse() {
				try {
					await this.$store.dispatch("Course/changeStatus", this.course);

					this.$nextTick(() => {
						this.$bvModal.hide("approveFieldModal");
						this.$bvModal.hide("dropdownActionModal");
					});
				} catch (err) {
					//
				}
			},

			async removeCourse() {
				try {
					await this.$store.dispatch("Course/remove", this.course);

					this.$nextTick(() => {
						this.$bvModal.hide("deleteCourseModal");
						this.$bvModal.hide("dropdownActionModal");
					});
				} catch (err) {
					//
				}
			}
		}

		// mounted() {
		// 	window.onresize = function () {
		// 		console.log(window.innerWidth);
		// 	};
		// },
	};
</script>

<style lang="scss" scoped></style>
