<template>
	<div class="course-form">
		<b-breadcrumb class="bg-white border rounded shadow-sm font-weight-600 mb-30px">
			<b-breadcrumb-item to="/dashboard">
				<b-icon class="mr-1" icon="house-fill" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
				Dashboard
			</b-breadcrumb-item>
			<b-breadcrumb-item to="/dashboard/courses"> Courses </b-breadcrumb-item>
			<template v-if="isUpdate">
				<b-breadcrumb-item active> Update </b-breadcrumb-item>
				<b-breadcrumb-item active> {{ course.title }} </b-breadcrumb-item>
			</template>
			<template v-else>
				<b-breadcrumb-item active> Create </b-breadcrumb-item>
			</template>
		</b-breadcrumb>

		<b-form @submit="handleSave">
			<b-card class="shadow-sm">
				<b-row cols="1" cols-md="3">
					<b-col>
						<b-form-group label="Category" label-for="category">
							<b-form-select
								:disabled="isLoading"
								v-model="course.category"
								text-field="name"
								value-field="_id"
								id="category"
								:options="categoriesOpt"
							></b-form-select>
							<input-error :vuelidate="$v.course.category" field="category" :namespace="namespace" />
						</b-form-group>
					</b-col>

					<b-col>
						<b-form-group label="Language made in" label-for="langMadeIn">
							<b-form-select
								:disabled="isLoading"
								v-model="course.langMadeIn"
								text-field="name"
								value-field="_id"
								id="langMadeIn"
								:options="langsOpt"
							></b-form-select>
							<input-error :vuelidate="$v.course.langMadeIn" field="langMadeIn" :namespace="namespace" />
						</b-form-group>
					</b-col>

					<b-col>
						<b-form-group label="Course Level" label-for="level">
							<b-form-select :disabled="isLoading" v-model="course.level" text-field="name" value-field="_id" id="level" :options="levelsOpt"></b-form-select>
							<input-error :vuelidate="$v.course.level" field="level" :namespace="namespace" />
						</b-form-group>
					</b-col>

					<b-col md="12">
						<b-form-group label="Course Title" label-for="title">
							<b-form-textarea :disabled="isLoading" id="title" v-model="course.title"></b-form-textarea>
							<input-error :vuelidate="$v.course.title" field="title" :namespace="namespace" />
						</b-form-group>
					</b-col>

					<b-col md="12">
						<b-form-group label="Short description" label-for="short_description">
							<b-form-textarea :disabled="isLoading" id="short_description" v-model="course.short_description"></b-form-textarea>
							<input-error :vuelidate="$v.course.short_description" field="short_description" :namespace="namespace" />
						</b-form-group>
					</b-col>
				</b-row>
			</b-card>

			<b-row class="mt-30px">
				<b-col cols="12" md="5" lg="4">
					<b-card header="Course thumbnail" header-class="font-weight-900 text-muted" body-class="p-0" class="shadow-sm">
						<VueUploadMultipleImage
							:disabled="isLoading"
							class="upload-image"
							browseText="(or) Select"
							dragText="Drag & Drop image"
							:data-images="course.thumbnail"
							@upload-success="uploadImageSuccess"
							@before-remove="beforeRemoveImage"
							:showEdit="false"
							accept="image/jpeg,image/png,image/jpg"
							:multiple="false"
							:showPrimary="false"
						/>
						<div class="text-center">
							<input-error :vuelidate="$v.course.thumbnail" field="thumbnail" :namespace="namespace" />
						</div>
					</b-card>
				</b-col>

				<b-col cols="12" md="7" lg="8" class="mt-3 mt-md-0 pt-3 pt-md-0">
					<b-card header="Course requirements" header-class="font-weight-900 text-muted" class="h-100 shadow-sm">
						<b-form-tags v-model="course.requirements" no-outer-focus class="mb-2 border-0" tagVariant="success">
							<template v-slot="{ tags, inputAttrs, inputHandlers, addTag, removeTag }">
								<b-input-group class="mb-2">
									<b-form-input :disabled="isLoading" v-bind="inputAttrs" v-on="inputHandlers"></b-form-input>
									<b-input-group-append>
										<b-button :disabled="isLoading" @click="addTag()" variant="outline-primary">Add</b-button>
									</b-input-group-append>
								</b-input-group>
								<ul class="m-0 pl-3 pt-2">
									<li v-for="tag in tags" @remove="removeTag(tag)" :key="tag">
										<div class="d-flex justify-content-between align-items-center">
											<span>{{ tag }}</span>
											<span class="c-pointer" style="font-size: 24px" @click="removeTag(tag)">&times;</span>
										</div>
									</li>
								</ul>
							</template>
						</b-form-tags>
						<input-error :vuelidate="$v.course.requirements" field="requirements" :namespace="namespace" />
					</b-card>
				</b-col>

				<b-col cols="12">
					<b-card header="Course description" header-class="font-weight-900 text-muted" class="shadow-sm mt-30px" body-class="p-0">
						<vue-editor :disabled="isLoading" style="border: none" v-model="course.description" :editorToolbar="customToolbar"></vue-editor>
					</b-card>
					<input-error :vuelidate="$v.course.description" field="description" :namespace="namespace" />
				</b-col>

				<b-col cols="12" class="mt-4 text-right">
					<b-overlay :show="isLoading" rounded opacity="0.6" spinner-small spinner-variant="primary" class="d-inline-block" @hidden="toggleLoading">
						<b-btn :disabled="isLoading" v-if="isUpdate" @click="handleSave" variant="outline-success">Update</b-btn>
						<b-btn :disabled="isLoading" v-else @click="handleSave" variant="outline-primary">Create</b-btn>
					</b-overlay>
				</b-col>
			</b-row>
		</b-form>
	</div>
</template>

<script>
	import { required, minLength, maxLength } from "vuelidate/lib/validators";
	import VueUploadMultipleImage from "vue-upload-multiple-image";
	import { VueEditor } from "vue2-editor";
	import { mapActions, mapState } from "vuex";
	export default {
		components: { VueUploadMultipleImage, VueEditor },

		data() {
			return {
				namespace: "Course",
				formData: null,
				course: {
					title: "",
					short_description: "",
					description: "",
					category: null,
					level: null,
					langMadeIn: null,
					thumbnail: [],
					requirements: []
				},
				customToolbar: [
					[{ header: [false, 1, 2, 3, 4, 5, 6] }],
					["bold", "italic", "underline", "strike"],
					[{ align: "" }, { align: "center" }, { align: "right" }, { align: "justify" }],
					["blockquote", "code-block"],
					[{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
					[{ indent: "-1" }, { indent: "+1" }],
					[{ color: [] }, { background: [] }],
					// ["link", "image", "video"],
					["clean"]
				]
			};
		},

		validations: {
			course: {
				title: { required, minLength: minLength(3), maxLength: maxLength(255) },
				short_description: { maxLength: maxLength(255) },
				description: { maxLength: maxLength(4096) },
				category: { required },
				level: { required },
				langMadeIn: { required },
				thumbnail: { required, minLength: minLength(1), maxLength: maxLength(1) },
				requirements: { maxLength: maxLength(10) }
			}
		},

		async mounted() {
			if (this.isUpdate) {
				await this.getCourse(this.courseId);

				let thumbnail = [{ path: `${this.thumbnailsURL}/${this.oldCourse.thumbnail}` }];

				this.course = { ...this.oldCourse, thumbnail };
			}

			this.getCategorisOptions();
			this.getLevelsOptions();
			await this.getLangsOptions();
			if (!this.isUpdate && this.langsOpt.length) {
				this.course.langMadeIn = this.langsOpt[0]?._id;
			}
		},

		computed: {
			...mapState({
				langsOpt: (state) => state.Language.options,
				categoriesOpt: (state) => state.Category.options,
				levelsOpt: (state) => state.Level.options,
				oldCourse: (state) => state.Course.one
			}),

			isUpdate() {
				return !!this.courseId;
			},

			courseId() {
				return this.$route.params.courseId;
			}
		},
		methods: {
			...mapActions({
				getLangsOptions: "Language/options",
				getCategorisOptions: "Category/options",
				getLevelsOptions: "Level/options",
				getCourse: "Course/edit",
				create: "Course/create",
				update: "Course/update"
			}),

			uploadImageSuccess(formData, _index, fileList) {
				this.course.thumbnail = fileList;

				this.formData = formData;
			},

			beforeRemoveImage(_index, done) {
				this.course.thumbnail = [];

				var r = confirm("remove image");

				if (r == true) return done();
			},

			async handleSave() {
				this.$v.$touch();

				if (this.$v.$invalid) return;

				if (this.formData) {
					this.formData.set("title", this.course.title);
					this.formData.set("short_description", this.course.short_description);
					this.formData.set("description", this.course.description);
					this.formData.set("category", this.course.category);
					this.formData.set("level", this.course.level);
					this.formData.set("langMadeIn", this.course.langMadeIn);
					this.course.requirements.forEach((r, i) => {
						this.formData.set(`requirements[${i}]`, r);
					});
				}

				try {
					let res;

					let config = { headers: { "Content-Type": "multipart/form-data" } };

					let data = { course: this.formData, config };

					this.toggleLoading();

					if (this.isUpdate) {
						data = this.formData ? data : { course: this.course, config: {} };
						res = await this.update(data);
					} else {
						res = await this.create(data);
					}

					if (res.msg) this.setGlobalSuccess(res.msg);

					this.$router.push("/dashboard/courses");

					this.resetForm();
				} catch (err) {
					//
				}

				this.toggleLoading();
			},

			resetForm() {
				this.formData = null;

				this.$v.$reset();

				this.removeAllErrors();

				this.course = {
					title: "",
					short_description: "",
					description: "",
					category: null,
					level: null,
					langMadeIn: null,
					thumbnail: [],
					requirements: []
				};
			}
		}
	};
</script>

<style lang="scss" scoped>
	input.form-control,
	textarea.form-control,
	select.custom-select {
		background: #f5f5f5;
	}
</style>

<style lang="scss">
	.upload-image {
		.image-container {
			width: 100%;
			height: 250px;
			border: 0;
			height: 250px;
			.preview-image {
				height: 220px;
				.show-image.centered {
					left: 0;
					transform: none;
					top: 0;
					width: 100%;
					height: 100%;
					position: absolute;
					padding: 5px;
					display: flex;
					justify-content: center;
					img.show-img {
						max-height: unset;
						max-width: unset;
						height: auto;
						width: 100%;
					}
				}
			}
		}
	}
	.quillWrapper {
		.ql-toolbar.ql-snow {
			border: none;
			border-bottom: 1px solid #ccc;
		}
		.ql-container.ql-snow {
			border: none;
		}
	}
</style>
