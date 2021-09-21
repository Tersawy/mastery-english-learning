<template>
	<div class="question question-speech flex-column align-items-start">
		<div class="w-100">
			<div class="d-flex w-100 align-items-center justify-content-between">
				<span>{{ question.text }}</span>
				<recorder @input="handleRecorder" v-if="!question.isAnswered" />
			</div>
			<div class="mt-2 d-flex flex-column">
				<span v-if="question.isTrue" class="bg-success-light w-fit-content px-2 rounded-lg">{{ question.answer }}</span>
				<template v-else>
					<span class="bg-danger-light w-fit-content text-white px-2 rounded-lg">{{ question.answer }}</span>
					<span class="bg-success-light w-fit-content px-2 mt-2 rounded-lg">{{ question.defaultAnswer }}</span>
				</template>
			</div>
		</div>
		<audio v-if="audioSrc" class="mt-3 w-100" controls :src="audioSrc"></audio>
	</div>
</template>

<script>
	import Recorder from "@/components/Recorder.vue";

	export default {
		props: ["question"],
		components: { Recorder },
		data() {
			return {
				audioSrc: null
			};
		},
		methods: {
			handleRecorder(blob) {
				this.audioSrc = URL.createObjectURL(blob);

				this.$emit("input", blob);
			}
		}
	};
</script>

<style lang="scss" scoped></style>
