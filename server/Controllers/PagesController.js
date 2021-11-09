const { COURSE_APPROVED } = require("../helpers/constants");
const Setting = require("../Models/Setting");

// let homePageCached = null; // cached home page

// let cachedTimeOut = null; // cached timeout

// let cachedMinutes = 10 ** 3 * 60 * 5; // 5 minutes

// let resetCached = () => {
// 	homePageCached = null; // reset cached home page
// 	cachedTimeOut = null; // reset cached timeout
// };

exports.home = async (req, res) => {
	const { me, isStudent } = req.body;

	let studentCourses = me && me.courses && isStudent ? me.courses : [];

	// if (homePageCached) {
	// 	// if cached home page
	// 	if (!cachedTimeOut) {
	// 		// if cached timeout
	// 		cachedTimeOut = setTimeout(resetCached, cachedMinutes); // reset cached timeout
	// 	}

	// 	return res.json(homePageCached); // return cached home page
	// }

	let aggregation = [
		{ $sort: { createdAt: -1 } },
		{ $project: { _id: 1, homePage: 1 } },
		{ $limit: 1 },
		{
			$lookup: {
				from: "categories", // join categories collection
				as: "categories",
				let: { categoryId: "$homePage.categories" },
				pipeline: [
					{ $match: { $expr: { $in: ["$_id", "$$categoryId"] } } }, // match categories
					{ $project: { _id: 1, name: 1 } }, // project categories
					{ $limit: 3 }, // limit to 3 categories
					{
						$lookup: {
							from: "courses", // join courses collection
							as: "courses",
							let: { category: "$_id" },
							pipeline: [
								{
									$match: {
										$expr: { $and: [{ $eq: ["$category", "$$category"] }, { $eq: ["$status", COURSE_APPROVED] }] }, // match courses
									},
								},
								{ $sort: { studentsCount: -1 } }, // sort courses by students count
								{ $limit: 3 },
								{
									$lookup: {
										from: "sections", // join sections collection
										as: "sections",
										let: { courseId: "$_id" },
										pipeline: [
											{ $match: { $expr: { $eq: ["$course", "$$courseId"] } } },
											{
												$lookup: {
													from: "lectures",
													as: "lectures",
													let: { sectionId: "$_id" },
													pipeline: [
														{ $match: { $expr: { $eq: ["$section", "$$sectionId"] } } }, // match lectures by section id
														{ $project: { time: 1, _id: 0 } }, // project lectures time
													],
												},
											},
											{
												$project: {
													time: { $sum: "$lectures.time" },
													lecturesCount: { $size: "$lectures" },
													_id: 0,
												},
											}, // project lectures time and lectures count
										],
									},
								},
								{
									$lookup: {
										from: "users", // join users collection to get instructor data
										as: "instructor",
										let: { instructorId: "$createdBy" },
										pipeline: [
											{ $match: { $expr: { $eq: ["$_id", "$$instructorId"] } } },
											{ $project: { username: 1, image: 1 } }, // project instructor data to get username and image
										],
									},
								},
								{ $unwind: { path: "$instructor", preserveNullAndEmptyArrays: true } },
								{
									$lookup: {
										from: "levels", // join levels collection to get course level
										as: "level",
										let: { levelId: "$level" },
										pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$levelId"] } } }, { $project: { name: 1 } }],
									},
								},
								{ $unwind: { path: "$level", preserveNullAndEmptyArrays: true } },
								{
									$project: {
										title: 1,
										short_description: 1,
										thumbnail: 1,
										studentsCount: 1,
										instructor: 1,
										level: 1,
										time: { $sum: "$sections.time" },
										lecturesCount: { $sum: "$sections.lecturesCount" },
										updatedAt: 1,
										isEnrolled: { $in: ["$_id", studentCourses] },
									},
								},
							], // end of courses pipeline
						},
					},
					{ $sort: { courses: -1 } }, // sort categories by courses length
				], // end of categories pipeline
			},
		},
		{
			$project: { _id: 0, categories: 1, headerBg: "$homePage.headerBg" },
		},
	];

	let homePageData = await Setting.aggregate(aggregation);

	if (homePageData.length > 0) {
		homePageData = homePageData[0];
		// homePageCached = homePageData;
	}

	res.json(homePageData);
};
