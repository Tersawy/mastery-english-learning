<template>
	<div class="question question-Choice d-flex flex-column align-items-start" style="line-height: 1.5">
		<span>{{ question.text }}</span>
		<ul v-if="question.isAnswered" class="w-100 d-flex justify-content-around mt-3 list-unstyled">
			<li v-for="(choice, i) in question.choices" :key="i" :class="`py-1 px-2 rounded-lg ${answerBg(choice)}`">{{ choice }}</li>
		</ul>
		<b-form-radio-group
			v-else
			:options="question.choices"
			class="choice-radio w-100 d-flex justify-content-around mt-3"
			@change="(value) => $emit('input', value)"
		></b-form-radio-group>
	</div>
</template>

<script>
	export default {
		props: ["question"],
		methods: {
			answerBg(choice) {
				if ((this.question.isTrue && this.question.answer == choice) || this.question.defaultAnswer == choice) {
					return "bg-success-light";
				}

				if (choice == this.question.answer) {
					return "bg-danger-light text-white text-line-through";
				}
			}
		}
	};
</script>
