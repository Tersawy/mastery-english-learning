const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const { QUESTION_ESSAY } = require("../helpers/constants");

const questionSchema = new Schema(
	{
		type: { type: Number, default: QUESTION_ESSAY },
		text: {
			type: String,
			trim: true,
			minLength: [3, "Question Must be greater than or equal 3 characters"],
			maxLength: [255, "Question Must be less than or equal 255 characters"],
		},
		choises: Array,
	},
	{ timestamps: true }
);

const quizSchema = new Schema(
	{
		lecture: {
			type: mongoose.Types.ObjectId,
			ref: "Lecture",
			required: [true, "Lecture is required"],
		},
		questions: [questionSchema],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Quiz", quizSchema);
