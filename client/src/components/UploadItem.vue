<template>
	<div class="d-flex align-items-center justify-content-between">
		<div class="mr-3 rounded-lg">
			<b-avatar :src="upload.imgSrc" class="shadow-sm" rounded="lg"></b-avatar>
		</div>

		<div style="width: 250px">
			<span>{{ upload.title | strLength(20) }}</span>
			<div class="d-flex align-items-center">
				<b-progress :variant="variant" class="font-weight-700 w-100">
					<b-progress-bar :max="100" :value="upload.progress" :label="label" show-progress :animated="inProgress" :striped="inProgress"></b-progress-bar>
				</b-progress>
				<span class="h4 mb-0 c-pointer ml-1" v-if="!inProgress" @click="removeUploaded">&times;</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ["upload"],

		computed: {
			inProgress() {
				return this.upload.status == "progress";
			},
			isDone() {
				return this.upload.status == "success";
			},
			isFailed() {
				return this.upload.status == "error";
			},
			variant() {
				if (this.inProgress) return "blue";
				if (this.isDone) return "success";
				return "danger";
			},
			label() {
				if (this.inProgress) return `${this.upload.progress}%`;
				if (this.isDone) return "Uploaded successfully";
				return "Upload failed !";
			}
		},

		methods: {
			removeUploaded() {
				this.$store.commit("removeUpload", this.upload);
			}
		}
	};
</script>
