const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sectionSchema = new Schema(
	{
		title: {
			type: String,
			trim: true,
			minLength: [3, "Section Title Must be greater than or equal 3 characters"],
			maxLength: [54, "Section Title Must be less than or equal 54 characters"],
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

module.exports = mongoose.model("Section", sectionSchema);
