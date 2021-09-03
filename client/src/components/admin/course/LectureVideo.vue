<template>
	<b-modal id="lectureVideo" @hidden="$emit('closed')" hide-footer size="xl" centered body-class="p-0">
		<template #modal-header="{ close }">
			<div class="d-flex align-items-center justify-content-between w-100">
				<div class="d-flex align-items-center">
					<h6 class="mb-0">
						Lecture:&nbsp;
						<span class="font-sm font-weight-700" v-b-tooltip="lecture.title">{{ lecture.title | strLength(30) }}</span>
					</h6>
				</div>
				<b-button size="sm" variant="outline-danger" @click="close()"> Close </b-button>
			</div>
		</template>
		<template #default>
			<video class="video-review d-flex w-100" controls :src="`${lecturesURL}/${lecture.video}`" ref="videoReview">
				Your browser does not support the video tag.
			</video>
		</template>
	</b-modal>
</template>

<script>
	export default {
		computed: {
			lecture() {
				return this.$store.state.Course.oneLecture;
			}
		}
	};
</script>

<style lang="scss" scoped></style>
