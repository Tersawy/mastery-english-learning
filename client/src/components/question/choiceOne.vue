<template>
	<div class="question question-Choice d-flex flex-column align-items-start" style="line-height: 1.5">
		<span>
			<span :class="`question-text ${textClass || ''}`">{{ question.text }}</span>
			<span class="ml-3">
				<slot name="iconStatus"></slot>
			</span>
		</span>
		<b-form-radio-group
			:options="question.choices"
			:checked="question.answer"
			:disabled="disabled"
			class="choice-radio w-100 d-flex justify-content-around mt-3"
			@change="(value) => $emit('input', value)"
		></b-form-radio-group>
	</div>
</template>

<script>
	export default {
		props: ["question", "text-class", "disabled"]
	};
</script>
