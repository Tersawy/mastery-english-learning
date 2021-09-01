<template>
	<b-modal id="lectureVideoForm" @hidden="resetModal" hide-footer @ok="handleSave" size="lg" @show="modalIsShown">
		<template #modal-header="{ close }">
			<div class="d-flex align-items-center justify-content-between w-100">
				<div class="d-flex align-items-center">
					<template>
						<h6 class="mb-0">{{ isChange ? "Change" : "Upload" }} lecture video for: &nbsp;</h6>
						<span class="font-sm font-weight-700" v-b-tooltip="lecture.title">{{ lecture.title | strLength(30) }}</span>
					</template>
				</div>
				<b-button size="sm" variant="outline-danger" @click="close()"> Close </b-button>
			</div>
		</template>
		<template #default="{ ok }">
			<b-form @submit.prevent="handleSave">
				<!-- -------------Video------------- -->
				<b-form-group label="Lecture Video" label-for="video">
					<b-form-file id="video" v-model="video" @input="handleVideo"></b-form-file>
					<input-error :vuelidate="$v.video" field="video" :namespace="namespace" />
				</b-form-group>

				<video class="video-review" controls v-if="video" ref="videoReview">Your browser does not support the video tag.</video>

				<div class="text-right">
					<b-btn v-if="isUpdate" @click="ok()" variant="outline-success">Update</b-btn>
					<b-btn v-else @click="ok()" variant="outline-primary">Save</b-btn>
				</div>
			</b-form>
		</template>
	</b-modal>
</template>

<script>
	import { required } from "vuelidate/lib/validators";

	export default {
		props: ["isChange"],

		data() {
			return {
				namespace: "Course",
				video: null,
				accept: ["mp4", "m3u8", "rmvb", "avi", "swf", "3gp", "mkv", "flv"],
				newUpload: { id: null, title: null, imgSrc: null, progress: 0, status: "progress" }
			};
		},

		validations: {
			video: { required }
		},

		computed: {
			isUpdate() {
				return !!this.oldLecture && !!this.oldLecture._id;
			},

			uploads() {
				return this.$store.state.uploads;
			},

			lecture() {
				return this.$store.state.Course.oneLecture;
			}
		},

		methods: {
			async handleSave(bvt) {
				bvt.preventDefault();

				this.$v.$touch();

				if (this.$v.$invalid) return;

				let config = {
					headers: { "Content-Type": "multipart/form-data" },
					onUploadProgress: (progressEvent) => {
						let modalIsOpened = true;

						if (modalIsOpened) {
							this.$bvModal.hide("lectureVideoForm");
							modalIsOpened = false;
						}

						let progress = +Math.round((progressEvent.loaded * 100) / progressEvent.total);

						this.newUpload.progress = progress;

						this.$store.commit("setUploadProgress", this.newUpload);
					}
				};

				let formData = new FormData();

				formData.set("video", this.video);

				let payload = { formData, config };

				this.newUpload.title = this.lecture.title;

				this.$store.commit("setUpload", this.newUpload);

				let res;

				try {
					if (this.isChange) {
						res = await this.$store.dispatch("Course/changeLectureVideo", payload);
					} else {
						res = await this.$store.dispatch("Course/uploadLectureVideo", payload);
					}

					this.$store.commit("setUploadStatus", { ...this.newUpload, status: "success" });

					this.$bvModal.hide("lectureVideoForm");

					this.setGlobalSuccess(res.msg);
				} catch (err) {
					if (err) console.log(err);

					this.$store.commit("setUploadStatus", { ...this.newUpload, status: "error" });
				}
			},

			handleVideo(video) {
				if (!video) return;

				let videoNameSplited = video.name.split(".");

				let ext = videoNameSplited[videoNameSplited.length - 1];

				if (!this.accept.includes(ext)) {
					this.video = null;
					return this.setGlobalError("Video is not valid");
				}

				let blobURL = URL.createObjectURL(video);

				setTimeout(() => {
					let videoReview = this.$refs.videoReview;

					videoReview.src = blobURL;

					let that = this;

					videoReview.onloadeddata = function () {
						setTimeout(() => {
							const canvas = document.createElement("canvas");

							canvas.width = videoReview.videoWidth;
							canvas.height = videoReview.videoHeight;

							canvas.getContext("2d").drawImage(videoReview, 0, 0, canvas.width, canvas.height);

							const dataURL = canvas.toDataURL();

							that.newUpload.id = that.uploads.length + 1;
							that.newUpload.imgSrc = dataURL;
						}, 500);
					};
				}, 500);
			},

			modalIsShown() {},

			resetModal() {
				this.$v.$reset();

				this.removeAllErrors();

				this.video = null;

				this.$emit("closed");
			}
		}
	};

	// videoReview.seekable.start(); // Returns the starting time (in seconds)
	// videoReview.seekable.end();    // Returns the ending time (in seconds)
	// videoReview.currentTime = 122; // Seek to 122 seconds
	// videoReview.played.end();
</script>

<style>
	.video-review {
		width: 100%;
	}
</style>
