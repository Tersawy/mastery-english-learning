const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			lowercase: true,
			required: [true, "Category name is required"],
			minLength: [2, "Category must be greater than or equal 2 characters"],
			maxLength: [54, "Category must be less than or equal 54 characters"],
		},
		parent: {
			type: mongoose.Types.ObjectId,
			ref: "Category",
			default: null,
		},
		deleted_at: { type: Date, default: null }
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
