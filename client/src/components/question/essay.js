export default {
	props: ["question"],
	render() {
		return (
			<div class="question question-essay d-flex align-items-start justify-content-between" style="line-height: 1.5">
				<span>{this.question.text}</span>
				<b-form-textarea class="d-flex mt-3" onChange={(value) => this.$emit("input", value)}></b-form-textarea>
			</div>
		);
	}
};
