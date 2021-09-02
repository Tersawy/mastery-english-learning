const User = require("../Models/User");

const { USER_ADMIN } = require("../helpers/constants");

const bcrypt = require("bcrypt");

exports.admins = async (req, res) => {
	let admins = User.find({ type: USER_ADMIN });

	let adminsCount = User.countDocuments({ type: USER_ADMIN });

	let [docs, total] = await Promise.all([admins, adminsCount]);

	res.json({ docs, total });
};

exports.create = async (req, res) => {
	const { username, fullname, phone, email, password } = req.body;

	let passwordHashed = await bcrypt.hash(password, 10);

	const admin = new User({ username, fullname, phone, email, password: passwordHashed, type: USER_ADMIN });

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

	let query = { _id: adminId, type: USER_ADMIN };

	await User.updateOne(query, adminData);

	res.status(200).json({ msg: "Admin has been updated successfully" });
};

exports.remove = async (req, res) => {
	const { adminId } = req.params;

	await User.deleteOne({ _id: adminId, type: USER_ADMIN });

	res.status(200).json({ msg: "Admin has been deleted successfully" });
};
