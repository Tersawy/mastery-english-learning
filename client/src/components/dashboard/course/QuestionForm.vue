<template>
	<b-modal
		:no-close-on-backdrop="isLoading"
		:no-close-on-esc="isLoading"
		id="questionForm"
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
						<h6 class="mb-0">Update Question</h6>
					</template>
					<template v-else>
						<h6 class="mb-0">Create Question</h6>
					</template>
				</div>
				<b-button :disabled="isLoading" size="sm" variant="outline-danger" @click="close()"> Close </b-button>
			</div>
		</template>
		<template #default="{ ok }">
			<b-form @submit.prevent="ok()">
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

				<div class="text-right">
					<b-overlay :show="isLoading" rounded opacity="0.6" spinner-small spinner-variant="primary" class="d-inline-block" @hidden="toggleLoading">
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
				question: {
					text: null,
					type: QUESTION_ESSAY,
					choices: [],
					answer: null
				}
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
			}
		},

		watch: {
			"question.type"(v) {
				let answer = this.oldQuestion.answer;

				let getAnswerIfType = (type) => (typeof answer === type ? answer : null);

				this.question.choices = [];

				switch (v) {
					case QUESTION_COMPLETE:
						this.question.answer = Array.isArray(answer) ? answer : [];
						break;
					case QUESTION_CHOICE_ONE:
						this.question.answer = getAnswerIfType("string");
						this.question.choices = this.oldQuestion.choices || [];
						break;
					case QUESTION_TRUE_OR_FALSE:
						this.question.answer = getAnswerIfType("boolean");
						break;
					case QUESTION_ESSAY:
						this.question.answer = getAnswerIfType("string");
						break;
					case QUESTION_SPEECH:
						this.question.answer = getAnswerIfType("string");
						break;
				}
			}
		},

		computed: {
			oldQuestion() {
				return this.$store.state.Course.oneQuestion;
			},

			isUpdate() {
				return !!this.oldQuestion && !!this.oldQuestion._id;
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
			async handleSave(bvt) {
				bvt.preventDefault();

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

				let res;

				try {
					this.toggleLoading();

					if (this.isUpdate) {
						res = await this.$store.dispatch("Course/updateQuestion", this.question);
					} else {
						res = await this.$store.dispatch("Course/createQuestion", this.question);
					}

					this.setGlobalSuccess(res.msg);

					this.$bvModal.hide("questionForm");

					this.resetModal();
				} catch (err) {
					//
				}

				this.toggleLoading();
			},

			modalIsShown() {
				setTimeout(() => this.$refs.textInput.focus(), 400);

				if (this.isUpdate) {
					this.question = { ...this.oldQuestion };
				}
			},

			resetModal() {
				this.$v.$reset();

				this.removeAllErrors();

				this.question = { text: null, type: QUESTION_ESSAY, choices: [], answer: null };
			}
		}
	};
</script>

<style lang="scss">
	#questionForm {
		.question-item:nth-child(odd) {
			background-color: #f5f5f5;
		}
	}
</style>
