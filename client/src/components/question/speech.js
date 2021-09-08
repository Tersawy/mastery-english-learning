import Recorder from "@/components/Recorder.vue";

export default {
	props: ["question"],
	components: { Recorder },
	render() {
		return (
			<div class="question question-speech flex-column align-items-start">
				<div class="d-flex w-100 align-items-center justify-content-between">
					<span>{this.question.text}</span>
					<recorder onInput={this.handleRecorder} />
				</div>
				{this.audioSrc && <audio class="mt-3 w-100" controls src={this.audioSrc}></audio>}
			</div>
		);
	},
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
