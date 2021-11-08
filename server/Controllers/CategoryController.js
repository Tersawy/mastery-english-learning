const Category = require("../Models/Category");

const { handleQueries } = require("../helpers/functions");

exports.all = async (req, res) => {
	handleQueries(req, Category);

	const { sort, skip, limit } = req.query;

	let query = { deleted_at: null };

	let projection = "_id name";

	let categories = Category.find(query, projection).sort(sort).skip(skip).limit(limit);

	let categoriesCount = Category.countDocuments(query);

	let [docs, total] = await Promise.all([categories, categoriesCount]);

	return res.json({ docs, total });
};

exports.options = async (req, res) => {
	let categories = await Category.find({ deleted_at: null }, "_id name");

	return res.json({ data: categories });
};

exports.create = async (req, res) => {
	let language = new Category({ name: req.body.name });

	await language.save();

	res.json({ msg: "Category has been created successfully" });
};

exports.update = async (req, res) => {
	let { categoryId } = req.params;

	await Category.updateOne({ _id: categoryId, deleted_at: null }, { name: req.body.name });

	res.json({ msg: "Category has been updated successfully" });
};

exports.remove = async (req, res) => {
	let { categoryId } = req.params;

	await Category.updateOne({ _id: categoryId }, { deleted_at: Date.now() });

	res.json({ msg: "Category has been deleted successfully" });
};
