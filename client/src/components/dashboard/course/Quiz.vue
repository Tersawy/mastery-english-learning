<template>
	<b-modal id="quiz" hide-footer size="xl">
		<template #modal-header="{ close }">
			<div class="d-flex align-items-center justify-content-between w-100">
				<div class="d-flex align-items-center">
					<h6 class="mb-0">
						<span class="font-weight-700">{{ lectureQuiz ? "Lecture" : "Section" }} Quiz: </span>
						<span>{{ lectureQuiz ? lecture.title : section.title }}</span>
					</h6>
				</div>
				<b-button size="sm" variant="outline-danger" @click="close()"> Close </b-button>
			</div>
		</template>
		<template #default>
			<p class="mb-0 lead text-center" v-if="!quiz || !quiz.questions || quiz.questions.length == 0">
				<span>There's no quiz to show, </span>
				<span class="text-blue c-pointer" style="text-decoration: underline" @click="createQuiz">Create quiz</span>
			</p>
			<template v-else>
				<div class="mb-3 text-center">
					<b-btn variant="outline-blue" @click="createQuestion">Add a new Question</b-btn>
				</div>
				<ul class="list-unstyled">
					<li v-for="(question, i) in quiz.questions" :key="i" class="question-item odd-light px-2 py-3">
						<div class="d-flex align-items-center justify-content-between">
							<div class="d-flex align-items-center justify-content-between">
								<span> {{ i + 1 }} )&nbsp;&nbsp;{{ question.text }}</span>
								<span style="font-size: 11px; letter-spacing: 1px"> &nbsp;&nbsp;(&nbsp;{{ QUESTION_TYPES_STR[question.type] }}&nbsp;)&nbsp;&nbsp; </span>
							</div>
							<div class="actions">
								<b-icon icon="pencil-square" scale="1.2" variant="success" class="mr-3 c-pointer" @click="updateQuestion(question)" />
								<b-icon icon="trash" scale="1.2" variant="danger" class="c-pointer" @click="removeQuestion(question)" />
							</div>
						</div>
						<div v-if="question.choices && question.choices.length">
							<ul class="d-flex align-items-center justify-content-around p-0 mt-2">
								<li v-for="(choice, i) in question.choices" :key="i">{{ choice }}</li>
							</ul>
						</div>
					</li>
				</ul>
			</template>
			<QuizForm :lectureQuiz="lectureQuiz" />
			<QuestionForm :lectureQuiz="lectureQuiz" />
			<DeleteFieldModal msg="Are you sure to delete this question ?" @done="handleRemoveQuestion" modal-id="removeQuestionModal" />
		</template>
	</b-modal>
</template>

<script>
	import { QUESTION_TYPES_STR } from "@/helpers/constants";
	import QuizForm from "@/components/dashboard/course/QuizForm.vue";
	import QuestionForm from "@/components/dashboard/course/QuestionForm.vue";
	import DeleteFieldModal from "@/components/DeleteFieldModal.vue";
	export default {
		components: { QuizForm, QuestionForm, DeleteFieldModal },
		props: ["lectureQuiz"],
		data() {
			return {
				namespace: "Course"
			};
		},

		computed: {
			quiz() {
				return this.lectureQuiz ? this.lecture.quiz : this.section.quiz;
			},

			lecture() {
				return this.$store.state.Course.oneLecture;
			},

			section() {
				return this.$store.state.Course.oneSection;
			},

			QUESTION_TYPES_STR() {
				return QUESTION_TYPES_STR;
			}
		},

		methods: {
			createQuiz() {
				let action = this.lectureQuiz ? "Course/setQuiz" : "Course/setSectionQuiz";

				this.$store.commit(action, {});

				this.$bvModal.show("quizForm");
			},

			createQuestion() {
				this.setQuestion({});
				this.$bvModal.show("questionForm");
			},

			updateQuestion(question) {
				this.setQuestion(question);
				this.$bvModal.show("questionForm");
			},

			removeQuestion(question) {
				this.setQuestion(question);
				this.$bvModal.show("removeQuestionModal");
			},

			setQuestion(question) {
				let action = this.lectureQuiz ? "Course/setQuestion" : "Course/setSectionQuestion";
				this.$store.commit(action, question);
			},

			async handleRemoveQuestion() {
				try {
					let actionName = this.lectureQuiz ? "Course/removeQuestion" : "Course/removeSectionQuestion";

					let res = await this.$store.dispatch(actionName);

					this.setGlobalSuccess(res.msg);
				} catch (err) {
					//
				}
				this.$bvModal.hide("removeQuestionModal");
			}
		}
	};
</script>

<style lang="scss">
	.odd-light:nth-child(odd) {
		background-color: #f5f5f5;
	}
</style>
