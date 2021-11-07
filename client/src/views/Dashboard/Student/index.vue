<template>
	<dashboard-layout class="students">
		<b-breadcrumb class="bg-white border rounded shadow-sm font-weight-600 mb-30px">
			<b-breadcrumb-item to="/dashboard">
				<b-icon class="mr-1" icon="house-fill" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
				Dashboard
			</b-breadcrumb-item>
			<b-breadcrumb-item active> Students </b-breadcrumb-item>
		</b-breadcrumb>

		<b-row class="mb-30px">
			<b-col cols="4">
				<b-form-group class="mb-0">
					<b-input-group>
						<b-form-input placeholder="Search in Students" v-model="search" />
						<b-input-group-append>
							<b-btn variant="blue">
								<i class="fas fa-filter"></i>
							</b-btn>
						</b-input-group-append>
					</b-input-group>
				</b-form-group>
			</b-col>
			<b-col class="text-right">
				<b-btn variant="primary" class="d-inline-flex align-items-center" @click="createStudent">
					<b-icon icon="plus" scale="1.3" class="mr-1"></b-icon>
					Create
				</b-btn>
			</b-col>
		</b-row>

		<b-modal id="dropdownActionModal" hide-header hide-footer body-class="p-0" centered size="sm">
			<ul class="m-0 p-0 list-unstyled">
				<b-dropdown-item link-class="py-2 d-flex align-items-center" @click="showCourses">
					<b-icon icon="eye" scale="0.8"></b-icon>
					<span class="mx-2 text-muted">Show Courses</span>
				</b-dropdown-item>

				<b-dropdown-item link-class="py-2 d-flex align-items-center" @click="editStudent">
					<b-icon icon="pencil-square" scale="0.8"></b-icon>
					<span class="mx-2 text-muted">Edit Student</span>
				</b-dropdown-item>

				<hr class="m-0" />

				<b-dropdown-item link-class="py-2 d-flex align-items-center text-danger" v-b-modal.deleteStudentModal>
					<b-icon icon="trash" scale="0.8"></b-icon>
					<span class="mx-2 text-muted">Delete Student</span>
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
				<div class="d-flex align-items-center">
					<b-form-checkbox
						v-b-tooltip="row.item.isActive ? 'Deactivate' : 'Activate'"
						v-model="row.item.isActive"
						@change="changeStatus(row.item)"
						class="ml-2 c-pointer"
						switch
					></b-form-checkbox>
					<b-icon @click="showActions(row.item)" icon="three-dots-vertical" scale="1.5" class="c-pointer"></b-icon>
				</div>
			</template>

			<template #cell(image)="row">
				<b-avatar :src="`${API_URL}/user-image/${row.value}`" :alt="row.value" class="shadow-sm" rounded="lg"></b-avatar>
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
		<DeleteFieldModal msg="Are you sure to delete this student ?" @done="removeStudent" modal-id="deleteStudentModal" />
		<StudentForm />
	</dashboard-layout>
</template>

<script>
	import dataTableMixin from "@/mixins/dataTableMixin";
	import DeleteFieldModal from "@/components/DeleteFieldModal.vue";
	import StudentForm from "@/components/dashboard/student/StudentForm.vue";
	import DashboardLayout from "@/components/layouts/DashboardLayout.vue";
	export default {
		mixins: [dataTableMixin],

		components: { DashboardLayout, DeleteFieldModal, StudentForm },

		data() {
			return {
				namespace: "Student",
				student: {},
				fields: [
					{ key: "image", lable: "Image", sortable: true },
					{ key: "fullname", lable: "Fullname", sortable: true },
					{ key: "username", lable: "Username", sortable: true },
					{ key: "phone", lable: "Phone", sortable: true },
					{ key: "email", lable: "Email", sortable: true },
					{ key: "actions", lable: "Actions" }
				]
			};
		},

		computed: {},

		methods: {
			async showCourses() {
				try {
					this.$store.commit("Student/setOne", this.student);

					await this.$store.dispatch("Student/courses");
				} catch (err) {
					//
				}

				this.$nextTick(() => {
					this.$bvModal.show("studentCourses");
				});
			},

			createStudent() {
				this.$store.commit("Student/setOne", {});
				this.$bvModal.show("studentForm");
			},

			editStudent() {
				this.$store.commit("Student/setOne", this.student);
				this.$bvModal.show("studentForm");
			},

			showActions(student) {
				this.student = student;
				this.$bvModal.show("dropdownActionModal");
			},

			async removeStudent() {
				try {
					let res = await this.$store.dispatch("Student/remove", this.student);

					if (res && res.msg) this.setGlobalSuccess(res.msg);

					this.$nextTick(() => {
						this.$bvModal.hide("deleteStudentModal");
						this.$bvModal.hide("dropdownActionModal");
					});
				} catch (err) {
					//
				}
			},

			async changeStatus(user) {
				try {
					await this.$store.dispatch("Student/changeStatus", user);

					let msg = `${user.username} has been ${user.isActive ? "activated" : "deactivated"} sucessfully.`;

					this.setGlobalSuccess(msg);
				} catch (err) {
					//
				}
			}
		}
	};
</script>

<style lang="scss" scoped></style>
