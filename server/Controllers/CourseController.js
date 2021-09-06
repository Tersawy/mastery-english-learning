const Course = require("../Models/Course");

const mongoose = require("mongoose");

const path = require("path");

const fs = require("fs");

const handleError = require("../helpers/handleError");

const { randomChar } = require("../helpers/functions");

const { getVideoDurationInSeconds } = require('get-video-duration')

const { COURSE_APPROVED, COURSE_PENDING } = require( "../helpers/constants" );

const thumbnailsDir = path.resolve(__dirname, "../public/images/courses/thumbnails");

const lecturePath = "../public/videos/courses/lectures";

exports.all = async (req, res) => {
	let courses = Course.find()
		.populate("category", "name")
		.populate("langMadeIn", "name")
		.populate("level", "name")
		.populate("createdBy", "username");

	let coursesCount = Course.countDocuments();

	let [docs, total] = await Promise.all([courses, coursesCount])

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

	const { me } = req.body;

	let course = await Course.aggregate([
		{ $match: { _id: mongoose.Types.ObjectId(courseId), deleted_at: null } },
		{
			$lookup: {
				from: "coursesections",
				let: { courseId: "$_id" },
				pipeline: [{ $match: { $expr: { $eq: ["$course", "$$courseId"] } } }],
				as: "sections",
			},
		},
		{
			$lookup: {
				from: "users",
				let: { createdBy: "$createdBy" },
				pipeline: [
					{ $match: { $expr: { $eq: ["$_id", "$$createdBy"] } } },
					{ $project: { username: 1, _id: 1, image: 1 } },
				],
				as: "createdBy",
			},
		},
		{ $unwind: "$createdBy" }
	]);

	course = course[0];

	if (!course) return res.status(404).json({ msg: "Course is not found" });

	course.requirements = course.requirements.map((r) => r.text);

	course.time = 0;

	for (let i = 0; i < course.sections.length; i++) {
		course.sections[i].time = 0;

		for (let l = 0; l < course.sections[i].lectures.length; l++) {
			let videoExist =
				course.sections[i].lectures[l].video &&
				fs.existsSync(path.join(__dirname, lecturePath, course.sections[i].lectures[l].video));

			course.sections[i].lectures[l].time = videoExist
				? await getVideoDurationInSeconds(path.join(__dirname, lecturePath, course.sections[i].lectures[l].video))
				: 0;

			course.sections[i].time += course.sections[i].lectures[l].time;
		}

		course.time += course.sections[i].time;
	}

	course.isEnrolled = me && me.courses.includes(courseId);

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
