<template>
	<div class="question question-essay d-flex align-items-start justify-content-between" style="line-height: 1.5">
		<span>
			<span :class="`question-text ${textClass || ''}`">{{ question.text }}</span>
			<span class="ml-3">
				<slot name="iconStatus"></slot>
			</span>
		</span>
		<b-form-textarea class="d-flex mt-3" :value="question.answer" @change="(value) => $emit('input', value)"></b-form-textarea>
	</div>
</template>

<script>
	export default {
		props: ["question", "text-class"]
	};
</script>
