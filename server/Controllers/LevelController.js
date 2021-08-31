const Level = require("../Models/Level");

exports.all = async (req, res) => {
	Promise.all([Level.find(), Level.countDocuments()]).then(([levels, total]) => {
		return res.json({ docs: levels, total });
	});
};

exports.options = async (req, res) => {
	let levels = await Level.find({}, "_id name");

	return res.json({ data: levels });
};

exports.create = async (req, res) => {
	let Level = new Level({});
	// await Level.save();
	const err = Level.validateSync();
	return res.json(err);
};

exports.show = (req, res) => {};

exports.edit = (req, res) => {};

exports.update = (req, res) => {};

exports.approve = (req, res) => {};

exports.remove = (req, res) => {};
