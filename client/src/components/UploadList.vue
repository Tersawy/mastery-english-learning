<template>
	<b-dropdown id="uploads-list" size="lg" variant="link" toggle-class="text-decoration-none" menu-class="shadow-lg" no-caret v-if="uploads.length">
		<template #button-content>
			<div class="icon rounded-lg">
				<b-badge class="position-absolute" variant="danger" v-if="countOfNotCompleted">{{ countOfNotCompleted }}</b-badge>
				<b-icon variant="white" icon="cloud-upload" class="rounded bg-blue p-2"></b-icon>
			</div>
		</template>

		<b-dropdown-text v-for="(upload, i) in uploads" :key="i">
			<upload-item :upload="upload" />
		</b-dropdown-text>
	</b-dropdown>
</template>

<script>
	import UploadItem from "./UploadItem.vue";
	export default {
		components: { UploadItem },
		computed: {
			uploads() {
				return this.$store.state.uploads;
			},

			countOfNotCompleted() {
				return this.uploads.reduce((pv, upload) => {
					if (!this.isCompleted(upload)) pv += 1;
					return pv;
				}, 0);
			}
		},

		methods: {
			isCompleted(upload) {
				return upload.progress == 100 && upload.status == "success";
			}
		}
	};
</script>

<style lang="scss" scoped>
	#uploads-list {
		position: fixed;
		left: 15px;
		top: 57px;
		z-index: 1000;
		.icon {
			display: flex;
			// box-shadow: 0 1rem 3rem #0000009c !important;
			box-shadow: 0px 0rem 20px 3px #302c2c80 !important;
			font-size: 2rem;
			.badge {
				font-size: 15px;
				right: 10px;
				padding: 2px !important;
			}
		}
	}
</style>
