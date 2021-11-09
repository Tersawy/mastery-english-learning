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
								<b-card header="App Logo" header-class="font-weight-900 text-muted" body-class="p-0" class="shadow-sm" style="width: max-content">
									<VueUploadMultipleImage
										:disabled="isLoading"
										class="upload-image"
										browseText="(or) Select"
										dragText="Drag & Drop image"
										:data-images="setting.logoDark"
										@upload-success="uploadLogoLight"
										@before-remove="beforeRemoveLogoLight"
										:showEdit="false"
										accept="image/jpeg,image/png,image/jpg"
										:multiple="false"
										:showPrimary="false"
									/>
								</b-card>
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

							<!-- -------------App Logo Light------------- -->
							<b-col class="d-flex justify-content-center">
								<b-card header="Header background" header-class="font-weight-900 text-muted" body-class="p-0" class="shadow-sm" style="width: max-content">
									<VueUploadMultipleImage
										idUpload="homePageHeader"
										idEdit="homePageHeaderEdit"
										:disabled="isLoading"
										class="upload-image"
										browseText="(or) Select"
										dragText="Drag & Drop image"
										:data-images="homePage.headerBg"
										@upload-success="uploadHomePageHeaderBg"
										@before-remove="beforeRemoveHomePageHeaderBg"
										:showEdit="false"
										accept="image/jpeg,image/png,image/jpg"
										:multiple="false"
										:showPrimary="false"
									/>
								</b-card>
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
	</dashboard-layout>
</template>

<script>
	import Multiselect from "vue-multiselect";
	import VueUploadMultipleImage from "vue-upload-multiple-image";
	import Levels from "@/components/dashboard/setting/Levels.vue";
	import Categories from "@/components/dashboard/setting/Categories.vue";
	import Languages from "@/components/dashboard/setting/Languages.vue";
	import DashboardLayout from "@/components/layouts/DashboardLayout.vue";
	import { required, minLength, maxLength } from "vuelidate/lib/validators";
	export default {
		components: { DashboardLayout, Levels, Categories, Languages, Multiselect, VueUploadMultipleImage },
		data() {
			return {
				namespace: "Setting",
				setting: { appName: "", logoDark: [] },
				homePage: {
					categories: [],
					headerBg: []
				},
				homePageFormData: new FormData(),
				settingFormData: new FormData()
			};
		},

		validations: {
			setting: {
				appName: { required, minLength: minLength(3), maxLength: maxLength(50) },
				logoDark: { required, minLength: minLength(1), maxLength: maxLength(1) }
			},
			homePage: {
				categories: { required, minLength: minLength(1), maxLength: maxLength(3) },
				headerBg: { required, minLength: minLength(1), maxLength: maxLength(1) }
			}
		},

		async mounted() {
			await this.getSetting();

			this.homePage.headerBg = [{ path: `${this.API_URL}/settings-images/${this.settings.homePage.headerBg}` }];
			this.setting.appName = this.settings.appName;
			this.setting.logoDark = [{ path: `${this.API_URL}/settings-images/${this.settings.logoDark}` }];

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

			uploadHomePageHeaderBg(formData, _index, fileList) {
				this.homePage.headerBg = fileList;

				formData.forEach((file) => {
					this.homePageFormData.append("headerBg", file);
				});
			},

			beforeRemoveHomePageHeaderBg(_index, done) {
				this.homePage.headerBg = [];

				this.homePageFormData.delete("headerBg");

				done();
				// var r = confirm("remove header image");

				// if (r == true) return done();
			},

			uploadLogoLight(formData, _index, fileList) {
				this.setting.logoDark = fileList;

				formData.forEach((file) => {
					this.settingFormData.append("logoDark", file);
				});
			},

			beforeRemoveLogoLight(_index, done) {
				this.setting.logoDark = [];

				this.settingFormData.delete("logoDark");

				done();
				// var r = confirm("remove logo");

				// if (r == true) return done();
			},

			async handleSaveSetting() {
				this.settingFormData.set("appName", this.setting.appName);

				this.$v.setting.$touch();

				if (this.$v.setting.$invalid) return;

				try {
					this.isLoading = true;

					let config = { headers: { "Content-Type": "multipart/form-data" } };

					let data = { settings: this.settingFormData, config };

					let res = await this.$store.dispatch(`${this.namespace}/update`, data);

					this.$showToast(res.msg);
				} catch (error) {
					this.$showToast(error.msg);
				} finally {
					this.isLoading = false;
				}
			},

			async handleSaveHomePage() {
				this.homePage.categories.forEach((category, i) => {
					this.homePageFormData.set(`categories[${i}]`, category._id);
				});

				this.$v.homePage.$touch();

				if (this.$v.homePage.$invalid) return;

				try {
					this.isLoading = true;

					let config = { headers: { "Content-Type": "multipart/form-data" } };

					let data = { homePage: this.homePageFormData, config };

					let res = await this.$store.dispatch(`${this.namespace}/updateHomePage`, data);

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
