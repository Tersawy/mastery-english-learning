<template>
	<router-link :to="`/courses/${course._id}/start`" v-if="isEnrolled || course.isEnrolled">
		<button class="btn btn-primary">
			<i class="fas fa-play"></i>
			<span class="pl-2">Start learning</span>
		</button>
	</router-link>

	<router-link :to="`/courses/${course._id}`" v-else>
		<button class="btn btn-primary">
			<span class="pl-2">More Details...</span>
		</button>
	</router-link>
</template>

<script>
	export default {
		props: {
			course: {
				type: Object,
				required: true
			}
		},

		computed: {
			isEnrolled() {
				return this.me && this.me.courses && this.isStudent && this.me.courses.includes(this.course._id);
			}
		}
	};
</script>

<style lang="scss" scoped>
	.btn {
		display: block;
		width: 100%;
		margin: 0;
		border-radius: 2px;
		margin-top: 13px;
		padding: 10px 8px;
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
			color: #505763;
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
