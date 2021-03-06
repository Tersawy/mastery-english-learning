const mongoose = require("mongoose");

const path = require("path");

const fs = require("fs");

const Course = require("../Models/Course");

const User = require("../Models/User");

const Lecture = require("../Models/Lecture");

const SectionQuiz = require("../Models/SectionQuiz");

const { COURSE_APPROVED, COURSE_PENDING, COURSE_STATUS, STUDENT } = require("../helpers/constants");

const { randomChar, handleQueries } = require("../helpers/functions");

const handleError = require("../helpers/handleError");

const thumbnailsDir = path.resolve(__dirname, "../../public/images/courses/thumbnails");

exports.all = async (req, res) => {

	let searchOptions = { isSearch: true, fields: ["title", "short_description", "description"] };

	handleQueries(req, Course, searchOptions);

	const { sort, skip, limit, search } = req.query;

	let query = { deleted_at: null, ...search };

	let courses = Course.find(query).sort(sort).skip(skip).limit(limit)
		.populate("category", "name")
		.populate("langMadeIn", "name")
		.populate("level", "name")
		.populate("createdBy", "username");

	let coursesCount = Course.countDocuments(query);

	let [docs, total] = await Promise.all([courses, coursesCount]);

	docs = docs.map((course) => ({
		_id: course._id,
		thumbnail: course.thumbnail,
		title: course.title,
		status: course.status,
		studentsCount: course.studentsCount,
		level: course.level.name,
		langMadeIn: course.langMadeIn.name,
		category: course.category.name,
		createdBy: course.createdBy.username,
	}));

	return res.json({ docs, total });
};

exports.myCourses = async function (req, res) {
	const { me } = req.body;

	let myCourses = me.courses.map(id => mongoose.Types.ObjectId(id));

	let query = { _id: { $in: myCourses }, deleted_at: null };

	const aggregate = [
		{ $match: query },
		{
			$lookup: {
				from: "sections",
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
								{ $match: { $expr: { $eq: ["$section", "$$sectionId"] } } },
								{ $project: { time: 1, _id: 0 } }
							]
						}
					},
					{ $project: { time: { $sum: "$lectures.time" }, lecturesCount: { $size: "$lectures" }, _id: 0 } }
				]
			}
		},
		{
			$lookup: {
				from: "users",
				as: "instructor",
				let: { instructorId: "$createdBy" },
				pipeline: [
					{ $match: { $expr: { $eq: ["$_id", "$$instructorId"] } } },
					{ $project: { username: 1, image: 1 } }
				]
			}
		},
		{ $unwind: { path: "$instructor", preserveNullAndEmptyArrays: true } },
		{
			$lookup: {
				from: "categories",
				as: "category",
				let: { categoryId: "$category" },
				pipeline: [
					{ $match: { $expr: { $eq: ["$_id", "$$categoryId"] } } },
					{ $project: { name: 1 } }
				]
			}
		},
		{ $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },
		{
			$lookup: {
				from: "levels",
				as: "level",
				let: { levelId: "$level" },
				pipeline: [
					{ $match: { $expr: { $eq: ["$_id", "$$levelId"] } } },
					{ $project: { name: 1 } }
				]
			}
		},
		{ $unwind: { path: "$level", preserveNullAndEmptyArrays: true } },
		{
			$project: {
				title: 1,
				short_description: 1,
				thumbnail: 1,
				studentsCount: 1,
				instructor: 1,
				category: 1,
				level: 1,
				time: { $sum: "$sections.time" },
				lecturesCount: { $sum: "$sections.lecturesCount" },
				updatedAt: 1
			}
		}
	];

	let coursesQuery = Course.aggregate(aggregate);

	let coursesCount = Course.countDocuments(query);

	let [courses, total] = await Promise.all([coursesQuery, coursesCount]);

	res.json({ docs: courses, total });
}

exports.create = (req, res) => {
	const { me, title, short_description, description, category, level, langMadeIn, requirements } = req.body;

	if (!req.files) throw { status: 422, errors: { thumbnail: "No thumbnail uploaded" } };

	if (!req.files.file) throw { status: 422, errors: { thumbnail: "Thumbnail is required" } };

	const image = req.files.file;

	uploadThumbnail(image, (err, imgName) => {
		if (err) return res.status(500).json({ errors: { server: "Something went wrong" } });

		let course = {
			createdBy: me._id,
			title,
			short_description,
			description,
			category,
			level,
			langMadeIn,
			requirements: requirements.reduce((pv, cv) => [...pv, { text: cv }], []),
			thumbnail: imgName,
		};

		course = new Course(course);

		let userUpdate = User.updateOne({ _id: me._id }, { $push: { courses: course._id } });

		course = course.save();

		Promise.all([userUpdate, course]).then(() => res.json({ msg: "Course has been created successfully" })).catch(err => handleError(err, (error) => res.status(error.status).json(error)));
	});
};

exports.show = async (req, res) => {
	const { courseId } = req.params;

	const { me, isAdmin, isInstructor, isOwner } = req.body;

	let status = isAdmin || isInstructor || isOwner ? { $in: COURSE_STATUS } : COURSE_APPROVED;

	let course = await Course.aggregate([
		{ $match: { _id: mongoose.Types.ObjectId(courseId), deleted_at: null, status } },
		{
			$lookup: {
				from: "sections",
				let: { courseId: "$_id" },
				as: "sections",
				pipeline: [
					{ $match: { $expr: { $eq: ["$course", "$$courseId"] } } },
					{
						$lookup: {
							from: "lectures",
							let: { sectionId: "$_id" },
							as: "lectures",
							pipeline: [
								{ $match: { $expr: { $eq: ["$section", "$$sectionId"] } } },
								{ $project: { description: 1, title: 1, createdAt: 1, video: 1, videoReview: 1, time: 1 } },
							],
						},
					},
					{ $project: { title: 1, lectures: 1 } },
				],
			},
		},
		{
			$lookup: {
				from: "users",
				let: { createdBy: "$createdBy" },
				as: "createdBy",
				pipeline: [
					{ $match: { $expr: { $eq: ["$_id", "$$createdBy"] } } },
					{ $project: { username: 1, _id: 1, image: 1 } },
				],
			},
		},
		{ $unwind: { path: "$createdBy", preserveNullAndEmptyArrays: true } },
	]);

	course = course[0];

	if (!course) return res.status(404).json({ msg: "Course is not found" });

	course.requirements = course.requirements.map((r) => r.text);

	for (let i = 0; i < course.sections.length; i++) {
		let section = course.sections[i];
		let lectures = section.lectures;

		for (let l = 0; l < lectures.length; l++) {
			let lecture = lectures[l];

			if (!lecture.video) {
				delete lecture.video;
				delete lecture.videoReview;
				continue;
			}

			if (!lecture.videoReview) {
				if (!isAdmin && !isInstructor && !isOwner) {
					delete lecture.video;
				}
			}

			delete lecture.videoReview;
		}
	}

	course.isEnrolled = me && me.courses.includes(courseId);

	res.status(200).json(course);
};

exports.start = async (req, res) => {
	const { courseId } = req.params;

	const { me } = req.body;

	if (!me.courses.includes(courseId)) return res.status(403).json({ msg: "Please enroll to course first" });

	let status = COURSE_APPROVED;

	let aggregation = [
		{ $match: { _id: mongoose.Types.ObjectId(courseId), deleted_at: null, status } },
		{
			$lookup: {
				from: "sections",
				let: { courseId: "$_id" },
				as: "sections",
				pipeline: [
					{ $match: { $expr: { $eq: ["$course", "$$courseId"] } } },
					{
						$lookup: {
							from: "lectures",
							let: { sectionId: "$_id" },
							as: "lectures",
							pipeline: [
								{ $match: { $expr: { $eq: ["$section", "$$sectionId"] } } },
								{ $project: { description: 1, title: 1, video: 1, createdAt: 1, time: 1 } },
							],
						},
					},
					{
						$lookup: {
							from: "sectionquizzes",
							let: { sectionId: "$_id" },
							as: "quiz",
							pipeline: [
								{ $match: { $expr: { $eq: ["$section", "$$sectionId"] } } },
								{ $project: { _id: 1 } },
								{
									$lookup: {
										from: "sectionquizanswers",
										let: { quizId: "$_id" },
										as: "answer",
										pipeline: [
											{
												$match: {
													$expr: {
														$and: [
															{ $eq: ["$quiz", "$$quizId"] },
															{ $eq: ["$student", mongoose.Types.ObjectId(me._id)] },
														],
													},
												},
											},
											{ $project: { _id: 1, passRate: 1 } },
										],
									},
								},
								{ $unwind: { path: "$answer", preserveNullAndEmptyArrays: true } },
								{
									$project: { _id: 1, passRate: { $ifNull: ["$answer.passRate", 0] } },
								},
							],
						},
					},
					{ $unwind: { path: "$quiz", preserveNullAndEmptyArrays: true } },
					{
						$project: {
							lectures: 1,
							title: 1,
							hasQuiz: { $toBool: { $ifNull: ["$quiz._id", 0] } },
							quizPassRate: { $toInt: { $ifNull: ["$quiz.passRate", 0] } },
						},
					},
				],
			},
		},
		{
			$lookup: {
				from: "users",
				let: { createdBy: "$createdBy" },
				as: "createdBy",
				pipeline: [
					{ $match: { $expr: { $eq: ["$_id", "$$createdBy"] } } },
					{ $project: { username: 1, _id: 1, image: 1 } },
				],
			},
		},
		{ $unwind: "$createdBy" },
		{
			$project: {
				_id: 1,
				title: 1,
				createdBy: 1,
				description: 1,
				sections: {
					_id: 1,
					title: 1,
					hasQuiz: 1,
					quizPassRate: 1,
					lectures: {
						_id: 1,
						description: 1,
						title: 1,
						video: 1,
						time: 1
					},
				},
			},
		},
	];

	let course = await Course.aggregate(aggregation);

	course = course[0];

	if (!course) return res.status(404).json({ msg: "Course is not found" });

	course.time = 0;

	let isHaveSectionQuizIsNotPassed = false;

	for (let i = 0; i < course.sections.length; i++) {
		let section = course.sections[i];
		let lectures = section.lectures;

		if (i > 0) {
			let previousSection = course.sections[i - 1];

			if (previousSection.hasQuiz && previousSection.quizPassRate < 50) {
				isHaveSectionQuizIsNotPassed = true;
			}
		}

		for (let l = 0; l < lectures.length; l++) {
			let lecture = lectures[l];

			if (!lecture.video) {
				delete lecture.video;
				continue;
			}

			if (isHaveSectionQuizIsNotPassed) delete lectures[l].video;
		}

		if (isHaveSectionQuizIsNotPassed) {
			delete course.sections[i].hasQuiz;
			delete course.sections[i].quizPassRate;
		}
	}

	res.status(200).json(course);
};

exports.edit = async (req, res) => {
	const { courseId } = req.params;

	let course = await Course.findOne({ _id: courseId, deleted_at: null });

	if (!course) return res.status(404).json({ msg: "Course is not found" });

	course._doc.requirements = course.requirements.map((r) => r.text);

	res.status(200).json(course);
};

exports.update = async (req, res) => {
	const { title, short_description, description, category, level, langMadeIn, requirements } = req.body;

	let course = await Course.findOne({ _id: req.params.courseId, deleted_at: null });

	if (!course) throw { status: 404, msg: "Course is not found" };

	const image = req.files && req.files.file ? req.files.file : null;

	course.title = title;
	course.short_description = short_description;
	course.description = description;
	course.category = category;
	course.level = level;
	course.langMadeIn = langMadeIn;
	course.requirements = requirements.reduce((pv, cv) => [...pv, { text: cv }], []);

	if (!image) {
		await course.save();

		return res.status(200).json({ status: 200, msg: "Course has been updated successfully" });
	}

	uploadThumbnail(image, (err, imgName) => {
		if (err) return res.status(err.status).json(err);

		const oldThumbnail = path.resolve(thumbnailsDir, course.thumbnail || "");

		course.thumbnail = imgName;

		course.save((err) => {
			if (err) return handleError(err, (error) => res.status(error.status).json(error));

			if (fs.existsSync(oldThumbnail)) fs.unlinkSync(oldThumbnail);

			res.status(200).json({ status: 200, msg: "Course has been updated successfully" });
		});
	});
};

exports.changeStatus = async (req, res) => {
	const { courseId } = req.params;

	let course = await Course.findOne({ _id: courseId, deleted_at: null });

	if (!course) throw { status: 404, msg: "Course is not found" };

	let isApproved = course.status == COURSE_APPROVED;

	course.status = isApproved ? COURSE_PENDING : COURSE_APPROVED;

	await course.save();

	res.status(200).json({ msg: "Course has been approved successfully" });
};

exports.remove = async (req, res) => {
	const { courseId } = req.params;

	let course = await Course.findById(courseId);

	if (!course) throw { status: 404, msg: "Course is not found" };

	course.deleted_at = Date.now();

	await course.save();

	res.status(200).json({ msg: "Course has been deleted successfully" });
};

const uploadThumbnail = (image, callback) => {
	let extensionsAvailable = ["jpg", "jpeg", "png"];

	let imageNameSplited = image.name.split(".");

	let imageExtension = imageNameSplited[imageNameSplited.length - 1];

	if (!imageExtension || !extensionsAvailable.includes(imageExtension)) {
		return callback({ status: 422, errors: { thumbnail: "Thumbnail is not valid" } });
	}

	if (image.size > 4000000)
		return callback({ status: 422, errors: { thumbnail: "Thumbnail cannot be greater than 4 MB" } });

	let imgName = `${randomChar(8)}_${Date.now()}.${imageExtension}`;

	let imageDir = path.resolve(thumbnailsDir, imgName);

	if (!fs.existsSync(thumbnailsDir)) return callback({ status: 500, msg: "Something went wrong" });

	image.mv(imageDir, (err) => {
		if (err) return callback({ status: 500, msg: "Something went wrong" });

		callback(null, imgName);
	});
};
/*
**
**-------------------------------------------------------------------------------------------**
**----------------------------------- Course Detail -----------------------------------------**
**-------------------------------------------------------------------------------------------**
**
*/
exports.detail = async (req, res) => {
	const { courseId } = req.params;

	if (!courseId) throw { status: 422, msg: "Course id is required" };

	let aggregate = [
		{ $match: { _id: mongoose.Types.ObjectId(courseId) } },
		{ $project: { studentsCount: 1, title: 1 } },
		{
			$lookup: {
				from: "sections",
				as: "sections",
				let: { courseId: "$_id" },
				pipeline: [
					{ $match: { $expr: { $eq: ["$course", "$$courseId"] } } },
					{
						$lookup: { // get the number of lectures in each section
							from: "lectures",
							as: "lectures",
							let: { sectionId: "$_id" },
							pipeline: [
								{ $match: { $expr: { $eq: ["$section", "$$sectionId"] } } },
								{ $project: { _id: 1 } },
								{ $group: { _id: null, count: { $sum: 1 } } }
							]
						}
					},
					{
						$lookup: { // check if the section has quiz
							from: "sectionquizzes",
							as: "quiz",
							let: { sectionId: "$_id" },
							pipeline: [
								{ $match: { $expr: { $eq: ["$section", "$$sectionId"] } } },
								{ $project: { _id: 1 } },
							]
						}
					},
					{ $unwind: { path: "$lectures", preserveNullAndEmptyArrays: true } },
					{ $unwind: { path: "$quiz", preserveNullAndEmptyArrays: true } },
					{ $project: { title: 1, lecturesCount: "$lectures.count", hasQuiz: { $toBool: { $ifNull: ["$quiz", 0] } } } }
				]
			}
		},
		{
			$lookup: {
				from: "users",
				as: "students",
				let: { courseId: "$_id" },
				pipeline: [
					{ $match: { $expr: { $and: [{ $in: ["$$courseId", "$courses"] }, { $eq: ["$type", STUDENT] }] } } },
					{ $project: { _id: 1, username: 1, image: 1 } },
					{ $sort: { createdAt: -1 } },
					{ $limit: 5 }
				]
			}
		}
	];

	let [course] = await Course.aggregate(aggregate);

	if (!course) throw { status: 404, msg: "Course not found" };

	course.sectionsCount = course.sections.length;

	course.lecturesCount = course.sections.reduce((pv, cv) => pv + (cv.lecturesCount || 0), 0);

	res.json(course);
}

exports.studentCourse = async (req, res) => {
	let { courseId } = req.params;

	handleQueries(req, User);

	let { sort, skip, limit } = req.query;

	if (!courseId) throw { status: 422, msg: "Course id is required" };

	let students = await User.find({ courses: { $in: courseId }, type: STUDENT }, { _id: 1, username: 1, image: 1 }).sort(sort).skip(skip).limit(limit);

	res.json(students);
}

exports.courseSectionLectures = async (req, res) => {
	let { courseId, sectionId } = req.params;

	if (!courseId) throw { status: 422, msg: "Course id is required" };

	if (!sectionId) throw { status: 422, msg: "Section id is required" };

	let aggregate = [
		{ $match: { section: mongoose.Types.ObjectId(sectionId) } },
		{
			$lookup: {
				from: "quizzes",
				as: "quiz",
				let: { lectureId: "$lecture" },
				pipeline: [
					{ $match: { $expr: { $eq: ["$lecture", "$$lectureId"] } } },
					{ $project: { _id: 1 } },
					{ $group: { _id: null, count: { $sum: 1 } } }
				]
			}
		},
		{ $unwind: { path: "$quiz", preserveNullAndEmptyArrays: true } },
		{ $project: { title: 1, hasQuiz: { $toBool: { $ifNull: ["$quiz", 0] } } } }
	];

	let lectures = await Lecture.aggregate(aggregate);

	res.json(lectures);
}

exports.courseSectionQuiz = async (req, res) => {
	let { courseId, sectionId } = req.params;

	if (!courseId) throw { status: 422, msg: "Course id is required" };

	if (!sectionId) throw { status: 422, msg: "Section id is required" };

	let aggregate = [
		{ $match: { section: mongoose.Types.ObjectId(sectionId) } },
		{ $project: { minimumPassRate: 1 } },
		{
			$lookup: {
				from: "users",
				as: "studentsAnswers",
				let: { quizId: "$_id" },
				pipeline: [
					{ $match: { $expr: { $and: [{ $in: [mongoose.Types.ObjectId(courseId), "$courses"] }, { $eq: ["$type", STUDENT] }] } } },
					{ $project: { username: 1 } },
					{ $sort: { createdAt: -1 } },
					{ $limit: 5 },
					{
						$lookup: {
							from: "sectionquizanswers",
							as: "quizAnswer",
							let: { studentId: "$_id", quizId: "$$quizId" },
							pipeline: [
								{ $match: { $expr: { $and: [{ $eq: ["$student", "$$studentId"] }, { $eq: ["$quiz", "$$quizId"] }] } } },
								{ $project: { passRate: 1, attempts: 1, lastAttemptAt: "$updatedAt" } },
							]
						}
					},
					{ $unwind: { path: "$quizAnswer", preserveNullAndEmptyArrays: true } },
				]
			}
		},
	];

	let [quiz] = await SectionQuiz.aggregate(aggregate);

	res.json(quiz);
}

exports.courseSectionQuizStudentAnswers = async (req, res) => {
	let { courseId, quizId } = req.params;

	handleQueries(req, User);

	let { skip, limit } = req.query;

	if (!courseId) throw { status: 422, msg: "Course id is required" };

	if (!quizId) throw { status: 422, msg: "Quiz id is required" };

	let aggregate = [
		{ $match: { $expr: { $and: [{ $in: [mongoose.Types.ObjectId(courseId), "$courses"] }, { $eq: ["$type", STUDENT] }] } } },
		{ $project: { username: 1, createdAt: 1 } },
		{ $sort: { createdAt: -1 } },
		{ $skip: skip },
		{ $limit: limit },
		{
			$lookup: {
				from: "sectionquizanswers",
				as: "quizAnswer",
				let: { studentId: "$_id" },
				pipeline: [
					{ $match: { $expr: { $and: [{ $eq: ["$student", "$$studentId"] }, { $eq: ["$quiz", mongoose.Types.ObjectId(quizId)] }] } } },
					{ $project: { passRate: 1, attempts: 1, lastAttemptAt: "$updatedAt" } },
				]
			}
		},
		{ $unwind: { path: "$quizAnswer", preserveNullAndEmptyArrays: true } },
	];

	let studentsAnswers = await User.aggregate(aggregate);

	res.json(studentsAnswers);
}
