<template>
	<div class="question question-complete">
		<template v-for="(text, i) in questionText">
			<span v-if="text.type == 'span'" :key="i" :class="`question-text ${textClass || ''}`">{{ text.value }}</span>
			<input
				v-else
				type="text"
				:key="i"
				placeholder=".........................."
				class="input-complete"
				:disabled="disabled"
				v-model="value[text.index]"
				@change="(e) => handleAnswer(e, text.index)"
			/>
		</template>
		<span class="ml-3">
			<slot name="iconStatus"></slot>
		</span>
	</div>
</template>

<script>
	export default {
		props: ["question", "text-class", "disabled"],

		data() {
			let inputPlaces = this.question.text.match(/\.\.+/gi);

			let value = this.question.answer || Array(inputPlaces.length).fill("");

			return { value };
		},

		computed: {
			questionText() {
				let text = this.question.text;

				let textSplited = text.split(/\.\.+/gi);

				let getVNode = (prev, text, i) => {
					let isLast = i == textSplited.length - 1;

					let elements = [{ type: "span", value: text }];

					if (!isLast) elements.push({ type: "input", index: i });

					return [...prev, ...elements];
				};

				return textSplited.reduce(getVNode, []);
			}
		},

		methods: {
			handleAnswer(event, i) {
				event.target.style.width = ((event.target.value.length || 6) + 1) * 9 + "px";
				this.value[i] = event.target.value;
				this.$emit("input", this.value);
			}
		}
	};
</script>
