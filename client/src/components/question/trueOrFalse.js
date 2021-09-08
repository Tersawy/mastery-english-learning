export default {
	props: ["question"],
	render() {
		return (
			<div class="question question-true-or-false d-flex align-items-start justify-content-between" style="line-height: 1.5">
				<span>{this.question.text}</span>
				<b-form-radio-group
					options={[
						{ text: "true", value: true },
						{ text: "false", value: false }
					]}
					class="d-flex"
					onChange={(value) => this.$emit("input", value)}
				></b-form-radio-group>
			</div>
		);
	}
};
