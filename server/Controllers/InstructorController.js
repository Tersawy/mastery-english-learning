const User = require("../Models/User");

const { INSTRUCTOR } = require("../helpers/constants");

const bcrypt = require("bcrypt");

exports.instructors = async (req, res) => {
	let instructors = User.find({ type: INSTRUCTOR });

	let instructorsCount = User.countDocuments({ type: INSTRUCTOR });

	let [docs, total] = await Promise.all([instructors, instructorsCount]);

	res.json({ docs, total });
};

exports.create = async (req, res) => {
	const { username, fullname, phone, email, password } = req.body;

	let passwordHashed = await bcrypt.hash(password, 10);

	const instructor = new User({ username, fullname, phone, email, password: passwordHashed, type: INSTRUCTOR });

	await instructor.save();

	res.status(200).json({ msg: "Instructor has been created successfully" });
};

exports.update = async (req, res) => {
	const { username, fullname, phone, email, password } = req.body;

	const { instructorId } = req.params;

	let instructorData = { username, fullname, phone, email };

	if (password) {
		instructorData.password = await bcrypt.hash(password, 10);
	}

	let query = { _id: instructorId, type: INSTRUCTOR };

	await User.updateOne(query, instructorData);

	res.status(200).json({ msg: "Instructor has been updated successfully" });
};

exports.changeActivation = async (req, res) => {
	const { isActive } = req.body;

	const { instructorId } = req.params;

	let query = { _id: instructorId, type: INSTRUCTOR };

	await User.updateOne(query, { isActive });

	res.status(200).json({ msg: `Instructor has been ${isActive ? "activated" : "deactivated"} successfully` });
};

exports.remove = async (req, res) => {
	const { instructorId } = req.params;

	await User.deleteOne({ _id: instructorId, type: INSTRUCTOR });

	res.status(200).json({ msg: "Instructor has been deleted successfully" });
};
