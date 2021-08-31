const Language = require("../Models/Language");

exports.all = async (req, res) => {
	Promise.all([Language.find(), Language.countDocuments()]).then(([languages, total]) => {
		return res.json({ docs: languages, total });
	});
};

exports.options = async (req, res) => {
	let languages = await Language.find({}, "_id name");

	return res.json({ data: languages });
};

exports.create = async (req, res) => {
	let Language = new Language({});
	// await Language.save();
	const err = Language.validateSync();
	return res.json(err);
};

exports.show = (req, res) => {};

exports.edit = (req, res) => {};

exports.update = (req, res) => {};

exports.approve = (req, res) => {};

exports.remove = (req, res) => {};
