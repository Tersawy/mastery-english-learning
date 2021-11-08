const User = require("../Models/User");

const { ADMIN, OWNER } = require("../helpers/constants");

const bcrypt = require("bcrypt");

const { handleQueries } = require("../helpers/functions");

exports.admins = async (req, res) => {

	let searchOptions = { isSearch: true, fields: ["username", "fullname", "phone", "email"] };

	handleQueries(req, User, searchOptions);

	const { sort, skip, limit, search } = req.query;

	let admins = User.find({
		$and: [
			{ $or: [{ type: ADMIN }, { $and: [{ type: OWNER }, { _id: { $ne: req.body.me._id } }] }] },
			search
		]
	}).sort(sort).skip(skip).limit(limit);

	let adminsCount = User.countDocuments({ type: ADMIN });

	let [docs, total] = await Promise.all([admins, adminsCount]);

	res.json({ docs, total });
};

exports.create = async (req, res) => {
	const { username, fullname, phone, email, password } = req.body;

	let passwordHashed = await bcrypt.hash(password, 10);

	const admin = new User({ username, fullname, phone, email, password: passwordHashed, type: ADMIN });

	await admin.save();

	res.status(200).json({ msg: "Admin has been created successfully" });
};

exports.update = async (req, res) => {
	const { username, fullname, phone, email, password } = req.body;

	const { adminId } = req.params;

	let adminData = { username, fullname, phone, email };

	if (password) {
		adminData.password = await bcrypt.hash(password, 10);
	}

	let query = { _id: adminId, type: ADMIN };

	await User.updateOne(query, adminData);

	res.status(200).json({ msg: "Admin has been updated successfully" });
};

exports.changeActivation = async (req, res) => {
	const { isActive } = req.body;

	const { adminId } = req.params;

	let query = { _id: adminId, type: ADMIN };

	await User.updateOne(query, { isActive });

	res.status(200).json({ msg: `Admin has been ${isActive ? "activated" : "deactivated"} successfully` });
};

exports.remove = async (req, res) => {
	const { adminId } = req.params;

	await User.deleteOne({ _id: adminId, type: ADMIN });

	res.status(200).json({ msg: "Admin has been deleted successfully" });
};
