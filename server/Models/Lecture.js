const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const lectureSchema = new Schema(
	{
		title: {
			type: String,
			trim: true,
			minLength: [3, "Lecture Title Must be greater than or equal 3 characters"],
			maxLength: [54, "Lecture Title Must be less than or equal 54 characters"],
		},
		description: {
			type: String,
			trim: true,
			maxLength: [5120, "Lecture Description Must be less than or equal 5120 characters"],
		},
		section: {
			type: mongoose.Types.ObjectId,
			ref: "Section",
			required: [true, "Section is required"],
		},
		video: { type: String, default: null },
		videoReview: { type: Boolean, default: false }
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Lecture", lectureSchema);
