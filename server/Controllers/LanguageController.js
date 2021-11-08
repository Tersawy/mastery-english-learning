const Language = require("../Models/Language");

const { handleQueries } = require("../helpers/functions");

exports.all = async (req, res) => {
	handleQueries(req, Language);

	const { sort, skip, limit } = req.query;

	let query = { deleted_at: null };

	let projection = "_id name";

	let languages = Language.find(query, projection).sort(sort).skip(skip).limit(limit);

	let languagesCount = Language.countDocuments(query);

	let [docs, total] = await Promise.all([languages, languagesCount]);

	return res.json({ docs, total });
};

exports.options = async (req, res) => {
	let languages = await Language.find({ deleted_at: null }, "_id name");

	return res.json({ data: languages });
};

exports.create = async (req, res) => {
	let language = new Language({ name: req.body.name });

	await language.save();

	res.json({ msg: "Language has been created successfully" });
};

exports.update = async (req, res) => {
	let { languageId } = req.params;

	await Language.updateOne({ _id: languageId, deleted_at: null }, { name: req.body.name });

	res.json({ msg: "Language has been updated successfully" });
};

exports.remove = async (req, res) => {
	let { languageId } = req.params;

	await Language.updateOne({ _id: languageId }, { deleted_at: Date.now() });

	res.json({ msg: "Language has been deleted successfully" });
};
