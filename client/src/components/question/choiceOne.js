export default {
	props: ["question"],
	render() {
		return (
			<div class="question question-Choice d-flex flex-column align-items-start" style="line-height: 1.5">
				<span>{this.question.text}</span>
				<b-form-radio-group
					options={this.question.choices}
					class="Choice-radio w-100 d-flex justify-content-around mt-3"
					onChange={(value) => this.$emit("input", value)}
				></b-form-radio-group>
			</div>
		);
	}
};
