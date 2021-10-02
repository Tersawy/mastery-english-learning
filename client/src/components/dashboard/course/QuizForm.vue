<template>
	<b-modal
		:no-close-on-backdrop="isLoading"
		:no-close-on-esc="isLoading"
		id="quizForm"
		@hidden="resetModal"
		hide-footer
		@ok="handleSave"
		size="xl"
		@show="modalIsShown"
	>
		<template #modal-header="{ close }">
			<div class="d-flex align-items-center justify-content-between w-100">
				<div class="d-flex align-items-center">
					<template v-if="isUpdate">
						<h6 class="mb-0">Update Quiz</h6>
					</template>
					<template v-else>
						<h6 class="mb-0">Create Quiz</h6>
					</template>
				</div>
				<b-button :disabled="isLoading" size="sm" variant="outline-danger" @click="close()"> Close </b-button>
			</div>
		</template>
		<template #default="{ ok }">
			<b-form @submit.prevent="addQuestion">
				<!-- -------------text------------- -->
				<b-form-group label="Question" label-for="text">
					<b-form-input :disabled="isLoading" id="text" v-model="question.text" ref="textInput"></b-form-input>
					<input-error :vuelidate="$v.question.text" field="text" :namespace="namespace" />
				</b-form-group>

				<!-- -------------Type------------- -->
				<b-form-group label="Question Type" label-for="type">
					<b-form-select :disabled="isLoading" id="type" v-model="question.type" :options="questionTypes"></b-form-select>
					<input-error :vuelidate="$v.question.type" field="type" :namespace="namespace" />
				</b-form-group>

				<!-- -------------Choices------------- -->
				<b-form-group label="Question Choices" label-for="choices" v-if="isQuestionChoises">
					<b-form-tags :disabled="isLoading" input-id="choices" v-model="question.choices" placeholder="" tag-variant="blue"></b-form-tags>
					<input-error :vuelidate="$v.question.choices" field="choices" :namespace="namespace" />
				</b-form-group>

				<!-- -------------Answer------------- -->
				<b-form-group label="Question Answer" label-for="answer" v-if="!isQuestionEssay && !$v.question.text.$invalid">
					<b-form-tags :disabled="isLoading" v-if="isQuestionComplete" input-id="answer" v-model="question.answer" placeholder="" tag-variant="blue"></b-form-tags>
					<b-form-radio-group
						v-else-if="isQuestionTrueOrFalse"
						v-model="question.answer"
						:options="[true, false]"
						class="d-flex"
						:disabled="isLoading"
					></b-form-radio-group>
					<b-form-input :disabled="isLoading" v-else id="answer" v-model="question.answer"></b-form-input>
					<input-error :vuelidate="$v.question.answer" field="answer" :namespace="namespace" />
				</b-form-group>

				<div class="text-center py-4">
					<b-btn @click="addQuestion" v-if="!isQuestionUpdate" variant="outline-blue">Add The Question</b-btn>
					<b-btn @click="addQuestion" v-else variant="outline-success">Update The Question</b-btn>
				</div>

				<ul class="list-unstyled">
					<li v-for="(question, i) in quiz.questions" :key="i" class="question-item px-2 py-3">
						<div class="d-flex align-items-center justify-content-between">
							<div class="d-flex align-items-center justify-content-between">
								<span> {{ i + 1 }} )&nbsp;&nbsp;{{ question.text }}</span>
								<span style="font-size: 11px; letter-spacing: 1px"> &nbsp;&nbsp;(&nbsp;{{ QUESTION_TYPES_STR[question.type] }}&nbsp;)&nbsp;&nbsp; </span>
							</div>
							<div class="actions">
								<b-icon icon="pencil-square" scale="1.2" variant="success" class="mr-3 c-pointer" @click="fillToUpdateQuestion(question)" />
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

				<input-error :vuelidate="$v.quiz.questions" field="questions" :namespace="namespace" />

				<div class="text-right">
					<b-overlay :show="isLoading" rounded opacity="0.6" spinner-small spinner-variant="primary" class="d-inline-block">
						<b-btn :disabled="isLoading" v-if="isUpdate" @click="ok()" variant="outline-success">Update</b-btn>
						<b-btn :disabled="isLoading" v-else @click="ok()" variant="outline-primary">Save</b-btn>
					</b-overlay>
				</div>
			</b-form>
		</template>
	</b-modal>
</template>

<script>
	import { required, minLength, maxLength, numeric, requiredIf } from "vuelidate/lib/validators";
	import { QUESTION_COMPLETE, QUESTION_CHOICE_ONE, QUESTION_TRUE_OR_FALSE, QUESTION_ESSAY, QUESTION_SPEECH, QUESTION_TYPES_STR } from "@/helpers/constants";
	export default {
		props: ["lectureQuiz"],
		data() {
			return {
				namespace: "Course",
				questionTypes: [
					{ text: QUESTION_TYPES_STR[QUESTION_COMPLETE], value: QUESTION_COMPLETE },
					{ text: QUESTION_TYPES_STR[QUESTION_CHOICE_ONE], value: QUESTION_CHOICE_ONE },
					{ text: QUESTION_TYPES_STR[QUESTION_TRUE_OR_FALSE], value: QUESTION_TRUE_OR_FALSE },
					{ text: QUESTION_TYPES_STR[QUESTION_ESSAY], value: QUESTION_ESSAY },
					{ text: QUESTION_TYPES_STR[QUESTION_SPEECH], value: QUESTION_SPEECH }
				],
				quiz: {
					questions: []
				},
				question: {
					text: null,
					type: QUESTION_ESSAY,
					choices: [],
					answer: null
				},
				isQuestionUpdate: false
			};
		},

		validations: {
			question: {
				text: { required, minLength: minLength(3), maxLength: maxLength(255) },
				type: { numeric },
				choices: {
					required: requiredIf(function (nestedModel) {
						return nestedModel.type == QUESTION_CHOICE_ONE;
					}),
					minLength: minLength(2)
				},
				answer: {
					required: requiredIf(function (nestedModel) {
						return nestedModel.type != QUESTION_ESSAY;
					})
				}
			},
			quiz: {
				questions: { required, minLength: minLength(1), maxLength: maxLength(100) }
			}
		},

		watch: {
			"question.type"() {
				if (this.question.answer) {
					this.question.answer = null;
				}
			}
		},

		computed: {
			oldQuiz() {
				return this.$store.state.Course.oneQuiz;
			},

			isUpdate() {
				return !!this.oldQuiz && !!this.oldQuiz._id;
			},

			section() {
				return this.$store.state.Course.oneSection;
			},

			isQuestionChoises() {
				return this.question.type == QUESTION_CHOICE_ONE;
			},

			isQuestionComplete() {
				return this.question.type == QUESTION_COMPLETE;
			},

			isQuestionEssay() {
				return this.question.type == QUESTION_ESSAY;
			},

			isQuestionTrueOrFalse() {
				return this.question.type == QUESTION_TRUE_OR_FALSE;
			},

			QUESTION_TYPES_STR() {
				return QUESTION_TYPES_STR;
			}
		},

		methods: {
			addQuestion() {
				this.$v.question.$touch();

				if (this.$v.question.$invalid) return;

				if (this.question.type == QUESTION_COMPLETE) {
					let spacing = this.question.text.match(/\.\.+/g);

					if (!spacing) {
						return this.setGlobalError(`The question complete must contain at least two dots(..). like as "How .. you ?"`);
					}

					if (this.question.answer.length != spacing.length) {
						let pronoun = spacing.length > 1 ? "are" : "is";
						return this.setGlobalError(`Question has ${this.question.answer.length} answers, but ${spacing.length} ${pronoun} required`);
					}
				}

				if (this.question.type == QUESTION_CHOICE_ONE) {
					if (!this.question.choices.includes(this.question.answer)) {
						return this.setGlobalError(`The Question answer must be exits in choices`);
					}
				}

				this.isQuestionUpdate = false;

				this.quiz.questions.push(this.question);

				this.resetQuestion();

				this.$v.$reset();
			},

			fillToUpdateQuestion(question) {
				this.isQuestionUpdate = true;
				this.question = { ...question };
				this.removeQuestion(question);
			},

			removeQuestion(question) {
				this.quiz.questions = this.quiz.questions.filter((q) => question != q);
			},

			resetQuestion() {
				this.question = { text: null, type: QUESTION_ESSAY, choices: [] };
			},

			async handleSave(bvt) {
				bvt.preventDefault();

				this.$v.quiz.$touch();

				if (this.$v.quiz.$invalid) return;

				let res;

				try {
					this.setLoading(true);

					if (this.isUpdate) {
						let actionName = this.lectureQuiz ? "Course/updateQuiz" : "Course/updateSectionQuiz";

						res = await this.$store.dispatch(actionName, this.quiz);
					} else {
						let actionName = this.lectureQuiz ? "Course/createQuiz" : "Course/createSectionQuiz";

						res = await this.$store.dispatch(actionName, this.quiz);
					}

					this.setGlobalSuccess(res.msg);

					this.$bvModal.hide("quizForm");
				} catch (err) {
					//
				}

				this.setLoading(false);
			},

			modalIsShown() {
				setTimeout(() => this.$refs.textInput?.focus(), 400);

				if (this.isUpdate) {
					this.quiz = { ...this.oldQuiz };
				}
			},

			resetModal() {
				this.$v.$reset();

				this.removeAllErrors();

				this.quiz = { questions: [] };
			}
		}
	};
</script>

<style lang="scss">
	#quizForm {
		.question-item:nth-child(odd) {
			background-color: #f5f5f5;
		}
	}
</style>
