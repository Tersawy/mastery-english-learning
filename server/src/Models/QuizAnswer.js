const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const answerSchema = new Schema(
	{
		question: {
			type: mongoose.Types.ObjectId,
			ref: "Question",
			required: [true, "Question is required"],
		},
		value: Schema.Types.Mixed,
		isCorrected: { type: Boolean, default: false }, // used for question essay
		correctAnswer: { type: String }, // used for question essay (Not used for now)
		isTrue: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

const quizAnswerSchema = new Schema(
	{
		quiz: {
			type: mongoose.Types.ObjectId,
			ref: "Quiz",
			required: [true, "Quiz is required"],
		},
		student: {
			type: mongoose.Types.ObjectId,
			ref: "User",
			required: [true, "Student is required"],
		},
		answers: [answerSchema],
		isCorrected: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("QuizAnswer", quizAnswerSchema);
