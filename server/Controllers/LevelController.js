const Level = require("../Models/Level");

exports.all = async (req, res) => {
	let query = { deleted_at: null };

	let projection = "_id name";

	let levels = Level.find(query, projection);

	let levelsCount = Level.countDocuments(query);

	let [docs, total] = await Promise.all([levels, levelsCount]);

	return res.json({ docs, total });
};

exports.options = async (req, res) => {
	let levels = await Level.find({ deleted_at: null }, "_id name");

	return res.json({ data: levels });
};

exports.create = async (req, res) => {
	let language = new Level({ name: req.body.name });

	await language.save();

	res.json({ msg: "Level has been created successfully" });
};

exports.update = async (req, res) => {
	let { levelId } = req.params;

	await Level.updateOne({ _id: levelId, deleted_at: null }, { name: req.body.name });

	res.json({ msg: "Level has been updated successfully" });
};

exports.remove = async (req, res) => {
	let { levelId } = req.params;

	await Level.updateOne({ _id: levelId }, { deleted_at: Date.now() });

	res.json({ msg: "Level has been deleted successfully" });
};
