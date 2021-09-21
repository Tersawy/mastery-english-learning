<template>
	<div class="question question-true-or-false d-flex align-items-start justify-content-between" style="line-height: 1.5">
		<span>{{ question.text }}</span>
		<div v-if="question.isAnswered">
			<span :class="`py-1 px-2 mr-1 rounded-lg ${answerBg(true)}`">{{ true }}</span>
			<span :class="`py-1 px-2 rounded-lg ${answerBg(false)}`">{{ false }}</span>
		</div>
		<b-form-radio-group v-else :options="[true, false]" class="d-flex" @change="(value) => $emit('input', value)"></b-form-radio-group>
	</div>
</template>

<script>
	export default {
		props: ["question"],
		methods: {
			answerBg(value) {
				if ((this.question.isTrue && this.question.answer == value) || this.question.defaultAnswer == value) {
					return "bg-success-light";
				}

				if (value == this.question.answer) {
					return "bg-danger-light text-white text-line-through";
				}
			}
		}
	};
</script>
