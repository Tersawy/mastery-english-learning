<template>
	<div class="question question-speech flex-column align-items-start">
		<div class="w-100">
			<div class="d-flex w-100 align-items-center justify-content-between">
				<span>
					<span :class="`question-text ${textClass || ''}`">{{ question.text }}</span>
					<span class="ml-3">
						<slot name="iconStatus"></slot>
					</span>
				</span>
				<recorder @input="handleRecorder" v-if="!question.isAnswered" />
			</div>
			<div>
				<strong class="text-muted">Your answer is: </strong>
				<span v-if="question.isTrue" class="bg-success-light w-fit-content px-2 rounded-lg">{{ question.answer }}</span>
				<span v-else class="bg-danger-light w-fit-content text-white px-2 rounded-lg">{{ question.answer }}</span>
			</div>
			<!-- 
		<audio v-if="audioSrc && !question.isAnswered" class="mt-3 w-100" controls :src="audioSrc"></audio> -->
		</div>
	</div>
</template>

<script>
	import Recorder from "@/components/Recorder.vue";

	export default {
		props: ["question", "text-class"],
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
