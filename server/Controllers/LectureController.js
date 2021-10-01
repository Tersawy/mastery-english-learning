const CourseSections = require("../Models/CourseSections");

const fs = require("fs");

const path = require("path");

const handleError = require("../helpers/handleError");

const { randomChar } = require("../helpers/functions");

const videosDir = path.resolve(__dirname, "../public/videos/courses/lectures");

exports.create = async (req, res) => {
	const { title, description } = req.body;

	const { sectionId } = req.params;

	if (!sectionId) throw { status: 422, msg: "Section Id is required" };

	let lecture = { title, description };

	await CourseSections.updateOne({ _id: sectionId }, { $push: { lectures: lecture } });

	res.status(200).json({ msg: "Lecture has been created successfully" });
};

exports.update = async (req, res) => {
	const { title, description } = req.body;

	const { sectionId, lectureId } = req.params;

	await CourseSections.updateOne(
		{ _id: sectionId, "lectures._id": lectureId },
		{ $set: { "lectures.$.title": title, "lectures.$.description": description } }
	);

	res.status(200).json({ msg: "Lecture has been created successfully" });
};

exports.remove = async (req, res) => {
	const { sectionId, lectureId } = req.params;

	await CourseSections.updateOne({ _id: sectionId }, { $pull: { lectures: { _id: lectureId } } });

	res.status(200).json({ msg: "Lecture has been deleted successfully" });
};

exports.changeReview = async (req, res) => {
	const { videoReview } = req.body;

	const { sectionId, lectureId } = req.params;

	await CourseSections.updateOne(
		{ _id: sectionId, "lectures._id": lectureId },
		{ $set: { "lectures.$.videoReview": videoReview } }
	);

	res.status(200).json({ msg: "Video review has been changed successfully" });
};

exports.uploadVideo = async (req, res) => {
	const { sectionId, lectureId } = req.params;

	if (!sectionId) throw { status: 422, msg: "Section Id is required" };

	if (!lectureId) throw { status: 422, msg: "Lecture Id is required" };

	if (!req.files) throw { status: 422, msg: "No video uploaded" };

	if (!req.files.video) throw { status: 422, msg: "Video is required" };

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

		CourseSections.updateOne({ _id: sectionId, "lectures._id": lectureId }, { $set: { "lectures.$.video": videoName } })
			.then(() => {
				res.status(200).json({ status: 200, msg: "Lecture video has been uploaded successfully" });
			})
			.catch((err) => {
				handleError(err, (error) => {
					// let firstErrorMsg = error.errors[Object.keys(error.errors)[0]];
					// firstErrorMsg = Array.isArray(firstErrorMsg) ? firstErrorMsg[0] : firstErrorMsg;
					res.status(error.status).json(error /* { ...error, msg: firstErrorMsg } */);
				});
			});
	});
};

exports.changeVideo = async (req, res) => {
	const { sectionId, lectureId } = req.params;

	if (!sectionId) throw { status: 422, msg: "Section Id is required" };

	if (!lectureId) throw { status: 422, msg: "Lecture Id is required" };

	if (!req.files) throw { status: 422, msg: "No video uploaded" };

	if (!req.files.video) throw { status: 422, msg: "Video is required" };

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

		CourseSections.findOneAndUpdate(
			{ _id: sectionId, "lectures._id": lectureId },
			{ $set: { "lectures.$.video": videoName } },
			{ _id: 0, lectures: { $elemMatch: { _id: lectureId } } },
			(err, section) => {
				if (err) return handleError(err, (error) => res.status(error.status).json(error));

				if (section && Array.isArray(section.lectures) && section.lectures[0].video) {
					let oldVideo = path.resolve(videosDir, section.lectures[0].video);

					if (fs.existsSync(oldVideo)) fs.unlinkSync(oldVideo);
				}

				res.status(200).json({ status: 200, msg: "Lecture video has been uploaded successfully" });
			}
		);
	});
};
