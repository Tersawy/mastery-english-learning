const CourseSections = require("../Models/CourseSections");

const path = require("path");

const fs = require("fs");

const handleError = require("../helpers/handleError");

const { randomChar } = require("../helpers/functions");

const videosDir = path.resolve(__dirname, "../public/videos/courses/lectures");

exports.all = async (req, res) => {
	let query = { course: req.params.courseId };
	let sections = CourseSections.find(query);
	let sectionsCount = CourseSections.countDocuments(query);

	Promise.all([sections, sectionsCount]).then(([sections, total]) => {
		return res.json({ docs: sections, total });
	});
};

exports.show = async (req, res) => {
	let { sectionId: _id } = req.params;

	let section = await CourseSections.findById(_id);

	return res.json(section);
};

exports.create = async (req, res) => {
	const { title } = req.body;

	let section = new CourseSections({ title, course: req.params.courseId });

	await section.save();

	res.status(200).json({ msg: "Section has been created successfully" });
};

exports.update = async (req, res) => {
	const { title } = req.body;

	await CourseSections.updateOne({_id: req.params.sectionId, deleted_at: null}, { title });

	res.status(200).json({ msg: "Section has been updated successfully" });
};

exports.remove = async (req, res) => {
	await CourseSections.deleteOne({ _id: req.params.sectionId });
	res.status(200).json({ msg: "Section has been deleted successfully" });
};

exports.createLecture = async (req, res) => {
	const { title, description } = req.body;

	const { sectionId } = req.params;

	if (!sectionId) throw { status: 422, msg: "Section Id is required" };

	let lecture = { title, description };

	await CourseSections.updateOne({ _id: sectionId }, { $push: { lectures: lecture } })

	res.status(200).json({ msg: "Lecture has been created successfully" });
};

exports.updateLecture = async (req, res) => {
	const { title, description } = req.body;

	const { sectionId, lectureId } = req.params;

	await CourseSections.updateOne({ _id: sectionId, "lectures._id": lectureId }, { $set: { "lectures.$.title": title, "lectures.$.description": description } })

	res.status(200).json({ msg: "Lecture has been created successfully" });
};

exports.removeLecture = async (req, res) => {
	const { sectionId, lectureId } = req.params;

	await CourseSections.updateOne({ _id: sectionId }, { $pull: { lectures: { _id: lectureId } } });

	res.status(200).json({ msg: "Lecture has been deleted successfully" });
};

exports.uploadLectureVideo = async (req, res) => {
	const { sectionId, lectureId } = req.params;

	if (!sectionId) throw { status: 422, msg: "Section Id is required" };

	if (!lectureId) throw { status: 422, msg: "Lecture Id is required" };

	if (!req.files) throw { status: 422, msg: "No video uploaded" };

	if (!req.files.video) throw { status: 422, msg: "Video is required"};

	const video = req.files.video;

	let extensionsAvailable = ["mp4", "m3u8", "rmvb", "avi", "swf", "3gp", "mkv", "flv"];

	let videoNameSplited = video.name.split(".");

	let videoExtension = videoNameSplited[videoNameSplited.length - 1];

	if (!videoExtension || !extensionsAvailable.includes(videoExtension)) {
		throw { status: 422, msg: "Video is not valid" };
	}

	// if (video.size > 4000000) throw { status: 422, errors: { video: "Video cannot be greater than 4 MB" } };

	let videoName = `${randomChar(8)}_${Date.now()}.${videoExtension}`;

	let videoDir = path.resolve(videosDir, videoName);

	if (!fs.existsSync(videosDir)) throw { status: 500, msg: "Something went wrong" };

	video.mv(videoDir, (err) => {
		if (err) return res.status(500).json({ msg: "Something went wrong" });

		CourseSections.updateOne({ _id: sectionId, "lectures._id": lectureId }, { $set: { "lectures.$.video": videoName } }).then(() => {
				res.status(200).json({ status: 200, msg: "Lecture video has been uploaded successfully" });
			})
			.catch((err) => {
				handleError(err, (error) => {
					// let firstErrorMsg = error.errors[Object.keys(error.errors)[0]];
					// firstErrorMsg = Array.isArray(firstErrorMsg) ? firstErrorMsg[0] : firstErrorMsg;
					res.status(error.status).json(error/* { ...error, msg: firstErrorMsg } */);
				});
			});
	});
};
