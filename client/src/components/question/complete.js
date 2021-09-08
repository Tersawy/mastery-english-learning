export default {
	props: ["question"],
	render(h) {
		let text = this.question.text;

		let textSplited = text.split(/\.\.+/gi);

		let getVNode = (prev, t, i) => {
			let isLast = i == textSplited.length - 1;

			let elements = [h("span", t)];

			if (!isLast) {
				elements.push(
					h("input", {
						class: "input-complete",
						attrs: {
							placeholder: ".........................."
						},
						on: {
							input: (event) => {
								event.target.style.width = ((event.target.value.length || 6) + 1) * 9 + "px";
								this.value[i] = event.target.value;
								this.$emit("input", this.value);
							}
						}
					})
				);
			}

			return [...prev, ...elements];
		};

		textSplited = textSplited.reduce(getVNode, []);

		return h("div", { class: "question" }, textSplited);
	},

	data() {
		let inputPlaces = this.question.text.match(/\.\.+/gi);

		return {
			value: Array(inputPlaces.length).fill("")
		};
	}
};
