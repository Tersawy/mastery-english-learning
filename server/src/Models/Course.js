const mongoose = require("mongoose");

const { COURSE_STATUS, COURSE_PENDING } = require("../helpers/constants")

const Schema = mongoose.Schema;

const requirementSchema = new Schema({
	text: {
		type: String,
		trim: true,
		maxLength: [255, "Requirment Must be less than or equal 255 characters"],
	},
});

const courseSchema = new Schema(
	{
		title: {
			type: String,
			trim: true,
			required: [true, "Title is required"],
			minLength: [3, "Title Must be greater than or equal 3 characters"],
			maxLength: [255, "Title Must be less than or equal 255 characters"],
		},
		short_description: {
			type: String,
			trim: true,
			maxLength: [255, "Short description Must be less than or equal 255 characters"],
		},
		description: {
			type: String,
			trim: true,
			maxLength: [4096, "Description Must be less than or equal 4096 characters"],
		},
		category: {
			type: mongoose.Types.ObjectId,
			ref: "Category",
			required: [true, "Category is required"],
		},
		level: {
			type: mongoose.Types.ObjectId,
			ref: "Level",
			required: [true, "Level is required"],
		},
		status: {
			type: Number,
			validate: {
				validator: function (v) {
					return COURSE_STATUS.includes(+v);
				},
				message: (props) => `Course status \`${props.value}\` is not a valid!`,
			},
			default: COURSE_PENDING,
		},
		langMadeIn: {
			type: mongoose.Types.ObjectId,
			ref: "Language",
			required: [true, "Language is required"],
		},
		studentsCount: { type: Number, default: 0 },
		thumbnail: { type: String, default: "thumbnail-empty.jpg" },
		requirements: {
			type: [requirementSchema],
			max: [10, "Must be no more than 10 requirements, got {VALUE}"],
		},
		createdBy: {
			type: mongoose.Types.ObjectId,
			ref: "User",
			required: true,
		},
		deleted_at: { type: Date, default: null }
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
