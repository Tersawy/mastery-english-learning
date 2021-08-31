<template>
	<div class="dashboard">
		<!-- <b-card class="shadow-sm"> -->
		<!-- <h5 class="d-flex align-items-center mb-0 font-weight-600 text-muted">
				<b-icon icon="command" scale="1.3"></b-icon>
				<span class="mx-2"> Dashboard </span>
			</h5> -->
		<b-breadcrumb class="bg-white border rounded shadow-sm font-weight-600 mb-30px">
			<b-breadcrumb-item href="/dashboard" active>
				<b-icon icon="house-fill" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
				<span class="mx-2">Dashboard</span>
			</b-breadcrumb-item>
		</b-breadcrumb>
		<!-- </b-card> -->
		<b-row cols="1" cols-md="3">
			<b-col class="mb-4 mb-lg-0">
				<report-card name="Number of Courses" icon="collection" number="17" />
			</b-col>
			<b-col class="mb-4 mb-lg-0">
				<report-card name="Number of Students" icon="people" number="17" />
			</b-col>
			<b-col>
				<report-card name="Number of Enrollment" icon="diagram3" number="17" />
			</b-col>
		</b-row>

		<b-row class="mt-30px">
			<b-col md="8" class="mb-4 mb-lg-0">
				<div class="recent-courses shadow-sm bg-white px-3 pb-3 rounded">
					<div class="recent-header py-3 d-flex justify-content-between align-items-center">
						<div class="font-weight-600">Recent Courses</div>
						<router-link to="/course" class="font-md"> View All </router-link>
					</div>
					<b-table :fields="coursesFields" :items="courses" hover class="mb-0">
						<template #cell(status)="row">
							<span v-course-status="row.value"></span>
						</template>
					</b-table>
				</div>
			</b-col>
			<b-col>
				<div class="recent-students shadow-sm bg-white px-3 rounded">
					<div class="recent-header py-3 d-flex justify-content-between align-items-center">
						<div class="font-weight-600">Recent Students</div>
					</div>
					<table class="table table-hover mb-0">
						<tbody>
							<tr v-for="(student, i) in students" :key="i">
								<td width="60px">
									<div class="student-img">
										<img :src="require(`@/assets/images/user6.jpg`)" alt="" />
									</div>
								</td>
								<td>
									<h4 class="mb-0">
										{{ student.name }}
										<br />
										<span>{{ student.country }}</span>
									</h4>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</b-col>
		</b-row>
	</div>
</template>

<script>
	import ReportCard from "@/components/ReportCard";
	export default {
		components: { ReportCard },
		data() {
			return {
				students: [
					{ name: "David", country: "Italy", img: "user1.jpg" },
					{ name: "Muhammad", country: "Egypt", img: "user2.jpg" },
					{ name: "Amelia", country: "France", img: "user3.jpg" },
					{ name: "Olivia", country: "USA", img: "user4.jpg" },
					{ name: "Amit", country: "Jaban", img: "user5.jpg" }
					// { name: "Ashraf", country: "India", img: "user6.jpg" },
					// { name: "Diana", country: "Malaysia", img: "user7.jpg" },
					// { name: "Yasser", country: "Egypt", img: "user8.jpg" }
				],
				coursesFields: [
					{ key: "title", lable: "Title" },
					{ key: "status", lable: "Status" },
					{ key: "studentsCount", lable: "Students Count" }
				],
				courses: [
					{ title: "NodeJs", status: 0, studentsCount: 10 },
					{ title: "MongoDB", status: 1, studentsCount: 40 },
					{ title: "PHP", status: 0, studentsCount: 20 },
					{ title: "MySQL", status: 0, studentsCount: 100 },
					{ title: "Python", status: 1, studentsCount: 120 }
				]
			};
		}
	};
</script>

<style lang="scss" scoped>
	.recent-students {
		position: relative;
		min-height: 365px;
		background-color: #fff;
		.student-img {
			position: relative;
			width: 40px;
			height: 40px;
			border-radius: 50%;
			overflow: hidden;
			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}
		table {
			tr {
				&:hover,
				&:hover td h4 span {
					background: lighten(#007bff, 20);
					color: #fff;
				}
				td {
					padding: 10px 10px;
					h4 {
						font-size: 16px;
						font-weight: 500;
						line-height: 1.2em;
						span {
							font-size: 14px;
							color: #999;
						}
					}
				}
			}
		}
	}
</style>
