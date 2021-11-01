const User = require("../Models/User");

const Course = require("../Models/Course");

const { STUDENT } = require("../helpers/constants");

const bcrypt = require("bcrypt");

exports.students = async (req, res) => {
	let students = User.find({ type: STUDENT });

	let studentsCount = User.countDocuments({ type: STUDENT });

	let [docs, total] = await Promise.all([students, studentsCount]);

	res.json({ docs, total });
};

exports.create = async (req, res) => {
	const { username, fullname, phone, email, password } = req.body;

	let passwordHashed = await bcrypt.hash(password, 10);

	const student = new User({ username, fullname, phone, email, password: passwordHashed });

	await student.save();

	res.status(200).json({ msg: "Student has been created successfully" });
};

exports.update = async (req, res) => {
	const { username, fullname, phone, email, password } = req.body;

	const { studentId } = req.params;

	let studentData = { username, fullname, phone, email };

	if (password) {
		studentData.password = await bcrypt.hash(password, 10);
	}

	let query = { _id: studentId, type: STUDENT };

	await User.updateOne(query, studentData);

	res.status(200).json({ msg: "Student has been updated successfully" });
};

exports.changeActivation = async (req, res) => {
	const { isActive } = req.body;

	const { studentId } = req.params;

	let query = { _id: studentId, type: STUDENT };

	await User.updateOne(query, { isActive });

	res.status(200).json({ msg: `Student has been ${isActive ? "activated" : "deactivated"} successfully` });
};

exports.enroll = async (req, res) => {
	const { courseId } = req.body;
	const { studentId } = req.params;

	let query = { _id: studentId, type: STUDENT };

	let userUpdate = User.updateOne(query, { $push: { courses: courseId } });

	let courseUpdate = Course.updateOne({ _id: courseId }, { $inc: { studentsCount: 1 } });

	await Promise.all(userUpdate, courseUpdate);

	res.status(200).json({ msg: "Student has been enrolled successfully" });
};

exports.selfEnroll = async (req, res) => {
	const { courseId, me } = req.body;

	let query = { _id: me._id, type: STUDENT };

	if (me.courses.includes(courseId)) return res.status(422).json({ msg: "You have been enrolled already !" })

	let userUpdate = User.updateOne(query, { $push: { courses: courseId } });

	let courseUpdate = Course.updateOne({ _id: courseId }, { $inc: { studentsCount: 1 } });

	await Promise.all([userUpdate, courseUpdate]);

	res.status(200).json({ msg: "You have been enrolled successfully" });
};

exports.remove = async (req, res) => {
	const { studentId } = req.params;

	await User.deleteOne({ _id: studentId, type: STUDENT });

	res.status(200).json({ msg: "Student has been deleted successfully" });
};
