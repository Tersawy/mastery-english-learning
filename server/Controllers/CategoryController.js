const Category = require("../Models/Category");

exports.all = async (req, res) => {
	Promise.all([Category.find(), Category.countDocuments()]).then(([categories, total]) => {
		return res.json({ docs: categories, total });
	});
};

exports.options = async (req, res) => {
	let categories = await Category.find({}, "_id name");

	return res.json({ data: categories });
};

exports.create = async (req, res) => {
	let Category = new Category({});
	// await Category.save();
	const err = Category.validateSync();
	return res.json(err);
};

exports.show = (req, res) => {};

exports.edit = (req, res) => {};

exports.update = (req, res) => {};

exports.approve = (req, res) => {};

exports.remove = (req, res) => {};
