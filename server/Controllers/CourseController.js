const Course = require("../Models/Course");

const mongoose = require("mongoose");

const path = require("path");

const fs = require("fs");

const handleError = require("../helpers/handleError");

const { randomChar } = require("../helpers/functions");

const { getVideoDurationInSeconds } = require("get-video-duration");

const { COURSE_APPROVED, COURSE_PENDING, COURSE_STATUS } = require("../helpers/constants");

const thumbnailsDir = path.resolve(__dirname, "../public/images/courses/thumbnails");

const lecturePath = "../public/videos/courses/lectures";

exports.all = async (req, res) => {
	let courses = Course.find()
		.populate("category", "name")
		.populate("langMadeIn", "name")
		.populate("level", "name")
		.populate("createdBy", "username");

	let coursesCount = Course.countDocuments();

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

		course.save((err) => {
			if (err) return handleError(err, (error) => res.status(error.status).json(error));

			res.status(200).json({ status: 200, msg: "Course has been created successfully" });
		});
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
								{ $project: { description: 1, title: 1, createdAt: 1, video: 1, videoReview: 1 } },
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

	course.time = 0;

	for (let i = 0; i < course.sections.length; i++) {
		let section = course.sections[i];
		let lectures = section.lectures;

		section.time = 0;

		for (let l = 0; l < lectures.length; l++) {
			let lecture = lectures[l];

			if (!lecture.video) {
				lecture.time = 0;
				delete lecture.video;
				delete lecture.videoReview;
				continue;
			}

			let videoExist = fs.existsSync(path.join(__dirname, lecturePath, lecture.video));

			let videoPath = path.join(__dirname, lecturePath, lecture.video);

			lecture.time = videoExist ? await getVideoDurationInSeconds(videoPath) : 0;

			section.time += lecture.time;

			if (!lecture.videoReview) {
				if (!isAdmin && !isInstructor && !isOwner) {
					delete lecture.video;
				}
			}

			delete lecture.videoReview;
		}

		course.time += section.time;
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
								{ $project: { description: 1, title: 1, video: 1, createdAt: 1 } },
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

		section.time = 0;

		if (i > 0) {
			let previousSection = course.sections[i - 1];

			if (previousSection.hasQuiz && previousSection.quizPassRate < 50) {
				isHaveSectionQuizIsNotPassed = true;
			}
		}

		for (let l = 0; l < lectures.length; l++) {
			let lecture = lectures[l];

			if (!lecture.video) {
				lecture.time = 0;
				delete lecture.video;
				continue;
			}

			let videoExist = lecture.video && fs.existsSync(path.join(__dirname, lecturePath, lecture.video));

			let videoPath = path.join(__dirname, lecturePath, lecture.video || "");

			lecture.time = videoExist ? await getVideoDurationInSeconds(videoPath) : 0;

			section.time += lecture.time;

			if (isHaveSectionQuizIsNotPassed) delete lectures[l].video;
		}

		if (isHaveSectionQuizIsNotPassed) {
			delete course.sections[i].hasQuiz;
			delete course.sections[i].quizPassRate;
		}

		course.time += section.time;
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
