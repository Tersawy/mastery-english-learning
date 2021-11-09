const Setting = require("../Models/Setting");

const path = require("path");

const { randomChar } = require("../helpers/functions");

const fs = require("fs");

const settingsDir = path.resolve(__dirname, "../public/images/settings");

exports.getSettings = async (req, res) => {
	let settings = await Setting.findOne({}, { _id: 0, createdAt: 0, updatedAt: 0, __v: 0 });

	settings = settings || new Setting();

	res.json(settings);
};

exports.showSettings = async (req, res) => {
	let settings = await Setting.findOne({});

	settings = settings || new Setting();

	res.json(settings);
};

exports.updateSettings = async (req, res) => {
	const logoDark = req.files && req.files.logoDark ? req.files.logoDark : null;

	let settings = await Setting.findOne({});

	settings = settings || new Setting();

	settings.appName = req.body.appName;

	if (logoDark) {
		uploadImage(logoDark, async (err, imgName) => {
			if (err) return res.status(err.status).json(err);

			settings.logoDark = imgName;

			settings.logoLight = imgName;
			// settings.homePage = req.body.homePage;
			// settings.aboutPage = req.body.aboutPage;
			// settings.contactPage = req.body.contactPage;
			// settings.termsPage = req.body.termsPage;
			// settings.privacyPage = req.body.privacyPage;
			// settings.footer = req.body.footer;
			// settings.footerLinks = req.body.footerLinks;
			// settings.footerSocial = req.body.footerSocial;
			// settings.footerCopyright = req.body.footerCopyright;

			await settings.save();

			res.json({ msg: "Settings updated successfully" });
		});
	} else {
		await settings.save();

		res.json({ msg: "Settings updated successfully" });
	}
};

exports.updateHomePage = async (req, res) => {
	let headerBg = req.files && req.files.headerBg ? req.files.headerBg : null;

	let settings = await Setting.findOne({});

	settings = settings || new Setting();

	settings.homePage.categories = req.body.categories;

	if (headerBg) {
		uploadImage(headerBg, async (err, imgName) => {
			if (err) return res.status(err.status).json(err);

			settings.homePage.headerBg = imgName;

			await settings.save();

			res.json({ msg: "Settings updated successfully" });
		});
	} else {
		await settings.save();

		res.json({ msg: "Settings updated successfully" });
	}
};

exports.updateStudentCoursesPage = async (req, res) => {
	let headerBg = req.files && req.files.headerBg ? req.files.headerBg : null;

	let settings = await Setting.findOne({});

	settings = settings || new Setting();

	if (headerBg) {
		uploadImage(headerBg, async (err, imgName) => {
			if (err) return res.status(err.status).json(err);

			if (!settings.studentCoursesPage) settings.studentCoursesPage = {};

			settings.studentCoursesPage.headerBg = imgName;

			await settings.save();

			res.json({ msg: "Settings updated successfully" });
		});
	} else {
		await settings.save();

		res.json({ msg: "Settings updated successfully" });
	}
};

const uploadImage = (image, callback) => {
	let extensionsAvailable = ["jpg", "jpeg", "png"];

	let imageNameSplited = image.name.split(".");

	let imageExtension = imageNameSplited[imageNameSplited.length - 1];

	if (!imageExtension || !extensionsAvailable.includes(imageExtension)) {
		return callback({ status: 422, errors: { thumbnail: "Image is not valid" } });
	}

	if (image.size > 4000000)
		return callback({ status: 422, errors: { thumbnail: "Image cannot be greater than 4 MB" } });

	let imgName = `${randomChar(8)}_${Date.now()}.${imageExtension}`;

	let imageDir = path.resolve(settingsDir, imgName);

	if (!fs.existsSync(settingsDir)) return callback({ status: 500, msg: "Something went wrong" });

	image.mv(imageDir, (err) => {
		if (err) return callback({ status: 500, msg: "Something went wrong" });

		callback(null, imgName);
	});
};
