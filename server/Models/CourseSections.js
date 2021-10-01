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
			maxLength: [255, "Lecture Description Must be less than or equal 255 characters"],
		},
		video: { type: String, default: null },
		videoReview: { type: Boolean, default: false }
	},
	{ timestamps: true }
);

const sectionSchema = new Schema(
	{
		title: {
			type: String,
			trim: true,
			minLength: [3, "Section Title Must be greater than or equal 3 characters"],
			maxLength: [54, "Section Title Must be less than or equal 54 characters"],
		},
		lectures: {
			type: [lectureSchema],
			default: [],
		},
		course: {
			type: mongoose.Types.ObjectId,
			ref: "Course",
			required: [true, "Course is required"],
		},
		deleted_at: { type: Date, default: null }
	},
	{ timestamps: true }
);

module.exports = mongoose.model("CourseSection", sectionSchema);
