<template>
	<b-btn class="btn-enroll enrolled" :to="`/courses/${course._id}/start`">
		<b-icon icon="check2-circle"></b-icon>
		<span> Start Learning now </span>
	</b-btn>
</template>

<script>
	export default {
		props: ["course"]
	};
</script>

<style lang="scss" scoped>
	.btn {
		display: block;
		width: 100%;
		margin: 0;
		border-radius: 2px;
		margin-top: 13px;
		padding: 15px 12px;
		font-size: 15px;
		font-weight: 600;
		margin-bottom: 10px;
	}
	.btn-enroll {
		background: transparent;
		border-color: #505763;
		color: #686f7a;
		&:hover:not(:disabled),
		&:focus:not(:disabled) {
			background-color: #f2f3f5;
		}
		&:disabled {
			background-color: #f2f3f5;
			cursor: not-allowed;
		}
		&.enrolled {
			background-color: transparent;
			color: var(--success);
			border-color: var(--success);
		}
	}
</style>
