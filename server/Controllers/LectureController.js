const { existsSync, unlinkSync } = require("fs");

const path = require("path");

const handleError = require("../helpers/handleError");

const { randomChar } = require("../helpers/functions");

const { getVideoDurationInSeconds } = require("get-video-duration");

const Lecture = require( "../Models/Lecture" );

const videosDir = path.resolve(__dirname, "../public/videos/courses/lectures");

exports.create = async (req, res) => {
	const { title, description } = req.body;

	const { sectionId: section } = req.params;

	if (!section) throw { status: 422, msg: "Section Id is required" };

	let lecture = new Lecture({ title, description, section });
	
	await lecture.save();

	res.status(200).json({ msg: "Lecture has been created successfully" });
};

exports.update = async (req, res) => {
	const { title, description } = req.body;

	const { lectureId: _id } = req.params;

	if (!_id) throw { status: 422, msg: "Lecture Id is required" };

	await Lecture.updateOne({ _id }, { title, description });
	
	res.status(200).json({ msg: "Lecture has been created successfully" });
};

exports.remove = async (req, res) => {
	const { lectureId: _id } = req.params;

	if (!_id) throw { status: 422, msg: "Lecture Id is required" };

	await Lecture.deleteOne({ _id });

	res.status(200).json({ msg: "Lecture has been deleted successfully" });
};

exports.changeReview = async (req, res) => {
	const { videoReview } = req.body;

	const { lectureId: _id } = req.params;

	if (!_id) throw { status: 422, msg: "Lecture Id is required" };

	await Lecture.updateOne({ _id }, { videoReview });

	res.status(200).json({ msg: "Video review has been changed successfully" });
};

exports.uploadVideo = async (req, res) => {
	const { lectureId: _id } = req.params;

	if (!_id) throw { status: 422, msg: "Lecture Id is required" };

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

	if (!existsSync(videosDir)) throw { status: 500, msg: "Something went wrong" };

	video.mv(videoDir, async (err) => {
		if (err) return res.status(500).json({ msg: "Something went wrong" });

		let tempFilePath = path.resolve(video.tempFilePath);

		if (existsSync(tempFilePath)) unlinkSync(tempFilePath);

		let time = 0;

		try {
			time = await getVideoDurationInSeconds(videoDir);
		} catch (e) {
			console.log(e);

			if (existsSync(videoDir)) unlinkSync(videoDir);

			return res.status(422).json({ msg: "Video is not valid !" });
		}

		Lecture.updateOne({ _id }, { video: videoName, time }, (err) => {
			if (err) return handleError(err, (error) => res.status(error.status).json(error));

			res.status(200).json({ status: 200, msg: "Lecture video has been uploaded successfully" });
		})
	});
};

exports.changeVideo = async (req, res) => {
	const { lectureId: _id } = req.params;

	if (!_id) throw { status: 422, msg: "Lecture Id is required" };

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

	if (!existsSync(videosDir)) throw { status: 500, msg: "Something went wrong" };

	video.mv(videoDir, async (err) => {
		if (err) return res.status(500).json({ msg: "Something went wrong" });

		let tempFilePath = path.resolve(video.tempFilePath);

		if (existsSync(tempFilePath)) unlinkSync(tempFilePath);

		let time = 0;

		try {
			time = await getVideoDurationInSeconds(videoDir);
		} catch (e) {
			console.log(e);

			if (existsSync(videoDir)) unlinkSync(videoDir);

			return res.status(422).json({ msg: "Video is not valid !" });
		}

		Lecture.findOneAndUpdate({ _id }, { video: videoName, time }, { _id: 0, video: 1 }, (err, lecture) => {
				if (err) return handleError(err, (error) => res.status(error.status).json(error));

				if (lecture.video) {
					let oldVideo = path.resolve(videosDir, lecture.video);

					if (existsSync(oldVideo)) unlinkSync(oldVideo);
				}

				res.status(200).json({ status: 200, msg: "Lecture video has been uploaded successfully" });
			}
		);
	});
};
