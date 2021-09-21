<template>
	<div class="question question-essay d-flex align-items-start justify-content-between" style="line-height: 1.5">
		<span>{{ question.text }}</span>
		<div v-if="question.isAnswered" class="w-100">
			<div v-if="question.isCorrected">
				<div v-if="question.isTrue">
					<div class="mt-3 p-2 rounded-lg bg-success-light">{{ question.answer }}</div>
				</div>
				<div v-else>
					<div class="mt-3 p-2 rounded-lg bg-danger-light text-white">{{ question.answer }}</div>
					<div class="mt-3 p-2 rounded-lg bg-success-light">{{ question.defaultAnswer }}</div>
				</div>
			</div>
			<div v-else class="mt-3 p-2 rounded-lg bg-warning-light">{{ question.answer }}</div>
		</div>
		<b-form-textarea v-else class="d-flex mt-3" @change="(value) => $emit('input', value)"></b-form-textarea>
	</div>
</template>

<script>
	export default {
		props: ["question"]
	};
</script>
