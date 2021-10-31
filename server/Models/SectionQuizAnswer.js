const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const answerSchema = new Schema(
	{
		question: {
			type: mongoose.Types.ObjectId,
			required: [true, "Question is required"],
		},
		value: Schema.Types.Mixed,
		isCorrected: { type: Boolean, default: false }, // used for question essay
		correctAnswer: { type: String }, // used for question essay (Not used for now)
		isTrue: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

const sectionQuizAnswerSchema = new Schema(
	{
		quiz: {
			type: mongoose.Types.ObjectId,
			ref: "SectionQuiz",
			required: [true, "Quiz is required"],
		},
		student: {
			type: mongoose.Types.ObjectId,
			ref: "User",
			required: [true, "Student is required"],
		},
		answers: [answerSchema],
		isCorrected: { type: Boolean, default: false },
		passRate: { type: Number, default: 0 },
		attempts: { type: Number, default: 1 },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("SectionQuizAnswer", sectionQuizAnswerSchema);
