<template>
	<dashboard-layout>
		<b-breadcrumb class="bg-white border rounded shadow-sm font-weight-600 mb-30px">
			<b-breadcrumb-item to="/dashboard">
				<b-icon class="mr-1" icon="house-fill" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
				Dashboard
			</b-breadcrumb-item>
			<b-breadcrumb-item active> Settings </b-breadcrumb-item>
		</b-breadcrumb>

		<b-row cols="1" cols-md="2" cols-lg="3">
			<b-col>
				<Levels class="shadow-sm" />
			</b-col>
			<b-col class="mt-4 mt-md-0">
				<Categories class="shadow-sm" />
			</b-col>
			<b-col md="12" lg="4" class="mt-4 mt-lg-0">
				<Languages class="shadow-sm" />
			</b-col>
		</b-row>
		<b-row>
			<b-col class="mt-30px">
				<b-card class="shadow-sm">
					<template #header>
						<div class="d-flex justify-content-between align-items-center">
							<span>App setting</span>
						</div>
					</template>
					<b-form @submit.prevent="handleSaveSetting">
						<b-row cols="1">
							<b-col>
								<!-- -------------App Name------------- -->
								<b-form-group label="App Name" label-for="appName">
									<b-form-input :disabled="isLoading" id="appName" v-model="setting.appName" ref="nameInput"></b-form-input>
									<input-error :vuelidate="$v.setting.appName" field="appName" :namespace="namespace" />
								</b-form-group>
							</b-col>

							<!-- -------------App Logo Light------------- -->
							<b-col class="d-flex justify-content-center">
								<DragAndDropImage v-model="setting.logoDark" :image="setting.logoDark" maxHeight="350px" minHeight="280px" />
							</b-col>

							<b-col>
								<div class="text-right mt-4">
									<b-overlay :show="isLoading" rounded opacity="0.6" spinner-small spinner-variant="primary" class="d-inline-block">
										<b-btn :disabled="isLoading" @click="handleSaveSetting" variant="outline-success">Update</b-btn>
									</b-overlay>
								</div>
							</b-col>
						</b-row>
					</b-form>
				</b-card>
			</b-col>
		</b-row>
		<b-row>
			<b-col class="mt-30px">
				<b-card class="shadow-sm">
					<template #header>
						<div class="d-flex justify-content-between align-items-center">
							<span>Home page</span>
						</div>
					</template>
					<b-form @submit.prevent="handleSaveHomePage">
						<b-row cols="1">
							<!-- -------------Categories------------- -->
							<b-col>
								<b-form-group label="Categories" label-for="categories">
									<multiselect
										id="categories"
										v-model="homePage.categories"
										tag-placeholder="Add this as new category"
										placeholder="Search or add a category"
										label="name"
										track-by="_id"
										:options="categoriesOptions"
										:multiple="true"
										:taggable="true"
										:close-on-select="false"
										:clear-on-select="false"
										:preserve-search="true"
										@tag="addCategory"
									></multiselect>
									<input-error :vuelidate="$v.homePage.categories" field="categories" :namespace="namespace" />
								</b-form-group>
							</b-col>

							<!-- -------------Home page background header------------- -->
							<b-col class="d-flex justify-content-center">
								<DragAndDropImage v-model="homePage.headerBg" :image="homePage.headerBg" maxHeight="350px" minHeight="280px" />
							</b-col>

							<b-col>
								<div class="text-right mt-4">
									<b-overlay :show="isLoading" rounded opacity="0.6" spinner-small spinner-variant="primary" class="d-inline-block">
										<b-btn :disabled="isLoading" @click="handleSaveHomePage" variant="outline-success">Update</b-btn>
									</b-overlay>
								</div>
							</b-col>
						</b-row>
					</b-form>
				</b-card>
			</b-col>
		</b-row>

		<b-row>
			<b-col class="mt-30px">
				<b-card class="shadow-sm">
					<template #header>
						<div class="d-flex justify-content-between align-items-center">
							<span>Student courses page</span>
						</div>
					</template>
					<b-form @submit.prevent="handleSaveStudentCoursesPage">
						<b-row cols="1">
							<!-- -------------App Logo Light------------- -->
							<b-col class="d-flex justify-content-center">
								<DragAndDropImage v-model="studentCoursesPage.headerBg" :image="studentCoursesPage.headerBg" maxHeight="350px" minHeight="280px" />
							</b-col>

							<b-col>
								<div class="text-right mt-4">
									<b-overlay :show="isLoading" rounded opacity="0.6" spinner-small spinner-variant="primary" class="d-inline-block">
										<b-btn :disabled="isLoading" @click="handleSaveStudentCoursesPage" variant="outline-success">Update</b-btn>
									</b-overlay>
								</div>
							</b-col>
						</b-row>
					</b-form>
				</b-card>
			</b-col>
		</b-row>
	</dashboard-layout>
</template>

<script>
import Multiselect from "vue-multiselect";
import VueUploadMultipleImage from "vue-upload-multiple-image";
import Levels from "@/components/dashboard/setting/Levels.vue";
import Categories from "@/components/dashboard/setting/Categories.vue";
import Languages from "@/components/dashboard/setting/Languages.vue";
import DashboardLayout from "@/components/layouts/DashboardLayout.vue";
import DragAndDropImage from "@/components/DragAndDropImage";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
export default {
	components: { DragAndDropImage, DashboardLayout, Levels, Categories, Languages, Multiselect, VueUploadMultipleImage },
	data() {
		return {
			namespace: "Setting",
			setting: { appName: "", logoDark: "" },
			homePage: { categories: [], headerBg: "" },
			studentCoursesPage: { headerBg: "" },
			settingFormData: new FormData(),
			homePageFormData: new FormData(),
			studentCoursesPageFormData: new FormData()
		};
	},

	validations: {
		setting: {
			appName: { required, minLength: minLength(3), maxLength: maxLength(50) },
			logoDark: { required }
		},
		homePage: {
			categories: { required, minLength: minLength(1), maxLength: maxLength(3) },
			headerBg: { required }
		},
		studentCoursesPage: {
			headerBg: { required }
		}
	},

	async mounted() {
		await this.getSetting();

		this.homePage.headerBg = `${this.API_URL}/settings-images/${this.settings.homePage.headerBg}`;
		this.studentCoursesPage.headerBg = `${this.API_URL}/settings-images/${this.settings.studentCoursesPage.headerBg}`;
		this.setting.appName = this.settings.appName;
		this.setting.logoDark = `${this.API_URL}/settings-images/${this.settings.logoDark}`;

		if (this.settings.homePage.categories && this.settings.homePage.categories.length > 0) {
			this.settings.homePage.categories.forEach((categoryId) => {
				let category = this.categoriesOptions.find((category) => category._id === categoryId);
				if (category) {
					this.homePage.categories.push({ _id: category._id, name: category.name });
				}
			});
		}
	},

	computed: {
		settings() {
			return this.$store.state.Setting.settingsData;
		},

		categoriesOptions() {
			return this.$store.state.Category.all.docs;
		}
	},

	methods: {
		getSetting() {
			return this.$store.dispatch("Setting/showSettings");
		},

		addCategory(newCategory) {
			if (newCategory) {
				let oldCategory = this.categoriesOptions.find((category) => category.name == newCategory);

				if (oldCategory) {
					this.homePage.categories = [...this.homePage.categories, { _id: oldCategory._id, name: oldCategory.name }];
				}
			}
		},

		async handleSaveSetting() {
			let formData = new FormData();

			formData.set("appName", this.setting.appName);

			formData.set("logoDark", this.setting.logoDark);

			this.$v.setting.$touch();

			if (this.$v.setting.$invalid) return;

			try {
				this.isLoading = true;

				let config = { headers: { "Content-Type": "multipart/form-data" } };

				let data = { settings: formData, config };

				let res = await this.$store.dispatch(`${this.namespace}/update`, data);

				this.$showToast(res.msg);
			} catch (error) {
				this.$showToast(error.msg);
			} finally {
				this.isLoading = false;
			}
		},

		async handleSaveHomePage() {
			let formData = new FormData();

			formData.set("headerBg", this.homePage.headerBg);

			this.homePage.categories.forEach((category, i) => {
				formData.set(`categories[${i}]`, category._id);
			});

			this.$v.homePage.$touch();

			if (this.$v.homePage.$invalid) return;

			try {
				this.isLoading = true;

				let config = { headers: { "Content-Type": "multipart/form-data" } };

				let data = { homePage: formData, config };

				let res = await this.$store.dispatch(`${this.namespace}/updateHomePage`, data);

				this.$showToast(res.msg);
			} catch (error) {
				this.$showToast(error.msg);
			} finally {
				this.isLoading = false;
			}
		},

		async handleSaveStudentCoursesPage() {
			let formData = new FormData();

			formData.set("headerBg", this.studentCoursesPage.headerBg);

			this.$v.studentCoursesPage.$touch();

			if (this.$v.studentCoursesPage.$invalid) return;

			try {
				this.isLoading = true;

				let config = { headers: { "Content-Type": "multipart/form-data" } };

				let data = { studentCoursesPage: formData, config };

				let res = await this.$store.dispatch(`${this.namespace}/updateStudentCoursesPage`, data);

				this.$showToast(res.msg);
			} catch (error) {
				this.$showToast(error.msg);
			} finally {
				this.isLoading = false;
			}
		}
	}
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss">
.multiselect__tags {
	font-size: 12px;
}
.multiselect,
.multiselect__input,
.multiselect__single {
	font-size: 13px;
}
</style>
