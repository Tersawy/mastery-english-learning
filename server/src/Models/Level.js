const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const levelSchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			lowercase: true,
			required: [true, "Level name is required"],
			minLength: [2, "Level must be greater than or equal 2 characters"],
			maxLength: [54, "Level must be less than or equal 54 characters"],
		},
    deleted_at: { type: Date, default: null }
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Level", levelSchema);
