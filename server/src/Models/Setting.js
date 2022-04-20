const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const homePageSchema = new Schema(
	{
		categories: [{ type: "ObjectId", ref: "Category" }],
		headerBg: String,
	},
	{ _id: false }
);

const studentCoursesPageSchema = new Schema({ headerBg: String }, { _id: false });

const settingSchema = new Schema(
	{
		appName: String,
		logoDark: String,
		logoLight: String,
		homePage: { type: homePageSchema, default: { categories: [], headerBg: "" } },
		studentCoursesPage: { type: studentCoursesPageSchema, default: { headerBg: "" } },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Setting", settingSchema);
