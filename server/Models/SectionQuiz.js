const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const { QUESTION_ESSAY } = require("../helpers/constants");

let isNotEssay = function () { return this.type != QUESTION_ESSAY };

const questionSchema = new Schema(
	{
		type: { type: Number, default: QUESTION_ESSAY },
		text: {
			type: String,
			trim: true,
			minLength: [3, "Question Must be greater than or equal 3 characters"],
			maxLength: [255, "Question Must be less than or equal 255 characters"],
		},
		choices: { type: Array },
		answer: {
			type: Schema.Types.Mixed,
			required: [isNotEssay, "Answer is required"],
		},
	},
	{ timestamps: true }
);

const sectionQuizSchema = new Schema(
	{
		section: {
			type: mongoose.Types.ObjectId,
			ref: "Section",
			required: [true, "Section is required"],
		},
		questions: {
			type: [questionSchema],
			minLength: [1, "The Quiz must be have at least 1 question"],
			default: [],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("SectionQuiz", sectionQuizSchema);
