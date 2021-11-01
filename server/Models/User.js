const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const { STUDENT } = require("../helpers/constants");

const userSchema = new Schema(
	{
		username: {
			type: String,
			unique: true,
			lowercase: true,
			required: [true, "Username is required"],
			minLength: [3, "Username must be greater than or equal 3 characters"],
			maxLength: [54, "Username must be less than or equal 54 characters"],
		},
		fullname: {
			type: String,
			lowercase: true,
			required: [true, "Fullname is required"],
			minLength: [6, "Fullname must be greater than or equal 6 characters"],
			maxLength: [54, "Fullname must be less than or equal 54 characters"],
		},
		phone: {
			type: String,
			unique: true,
			maxLength: [54, "Phone must be less than or equal 54 characters"],
			required: [true, "Phone is required"],
		},
		email: {
			type: String,
			unique: true,
			lowercase: true,
			maxLength: [54, "Email must be less than or equal 54 characters"],
			required: [true, "Email is required"],
		},
		password: { type: String, required: [true, "Password is required"] },
		type: { type: Number, default: STUDENT },
		image: { type: String, default: "empty.jpg" },
		courses: [{ type: "ObjectId", ref: "Course" }], // for students only
		isActive: { type: Boolean , default: false},
		remmemberToken: { type: String, default: null },
		expiresToken: { type: Date, default: Date.now },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
