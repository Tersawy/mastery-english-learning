const { COURSE_APPROVED } = require( "../helpers/constants" );
const Setting = require("../Models/Setting");

exports.home = async (req, res) => {

	let aggregation = [
		{ $sort: { createdAt: -1 } },
		{ $project: { "homePage.categories": 1, _id: 1, name: 1 } },
		{ $limit: 1 },
		{ $unwind: "$homePage.categories" },
		{
			$lookup: {
				from: "courses",
				let: { cats: "$homePage.categories" },
				as: "courses",
				pipeline: [
					{ $match: { $expr: { $eq: ["$category", "$$cats"] }, deleted_at: null, status: COURSE_APPROVED } },
					{ $sort: { studentsCount: -1 } },
					{ $project: { _id: 1, title: 1, short_description: 1, thumbnail: 1 } },
					{ $limit: 3 },
				],
			},
		},
		{
			$lookup: {
				from: "categories",
				let: { cats: "$homePage.categories" },
				as: "category",
				pipeline: [
					{ $match: { $expr: { $eq: ["$_id", "$$cats"] }, deleted_at: null, parent: null } },
					{ $project: { _id: 1, name: 1 } },
				],
			},
		},
		{ $unwind: "$category" },
		{
			$group: { _id: { _id: "$category._id", name: "$category.name", courses: "$courses" } },
		},
	];

	let categories = await Setting.aggregate(aggregation);

	categories = categories.map((r) => r._id);

	res.status(200).json({ categories });
};
