<template>
	<div class="question question-true-or-false d-flex align-items-start justify-content-between" style="line-height: 1.5">
		<span>
			<span :class="`question-text ${textClass || ''}`" style="">{{ question.text }}</span>
			<span class="ml-3">
				<slot name="iconStatus"></slot>
			</span>
		</span>
		<b-form-radio-group
			:disabled="disabled"
			:checked="question.answer"
			:options="[true, false]"
			class="d-flex"
			@change="(value) => $emit('input', value)"
		></b-form-radio-group>
	</div>
</template>

<script>
	export default {
		props: ["question", "text-class", "disabled"],
		data() {
			return {
				value: null
			};
		},
		mounted() {
			this.value = this.question.answer;
		}
	};
</script>
