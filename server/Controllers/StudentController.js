const User = require("../Models/User");

const Course = require("../Models/Course");

const { USER_STUDENT } = require("../helpers/constants");

const bcrypt = require("bcrypt");

exports.students = async (req, res) => {
	const students = await User.find({ deleted_at: null, type: USER_STUDENT });

	res.json(students);
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

	let query = { _id: studentId, type: USER_STUDENT };

	await User.updateOne(query, studentData);

	res.status(200).json({ msg: "Student has been updated successfully" });
};

exports.enroll = async (req, res) => {
	const { courseId } = req.body;
	const { studentId } = req.params;

	let query = { _id: studentId, type: USER_STUDENT };

	let userUpdate = User.updateOne(query, { $push: { courses: courseId } });

	let courseUpdate = Course.updateOne({ _id: courseId }, { $inc: { studentsCount: 1 } });

	await Promise.all(userUpdate, courseUpdate);

	res.status(200).json({ msg: "Student has been enrolled successfully" });
};

exports.selfEnroll = async (req, res) => {
	const { courseId, me } = req.body;

	let query = { _id: me._id, type: USER_STUDENT };

	let userUpdate = User.updateOne(query, { $push: { courses: courseId } });

	let courseUpdate = Course.updateOne({ _id: courseId }, { $inc: { studentsCount: 1 } });

	await Promise.all(userUpdate, courseUpdate);

	res.status(200).json({ msg: "You have been enrolled successfully" });
};

exports.remove = async (req, res) => {
	const { studentId } = req.params;

	await User.deleteOne({ _id: studentId, type: USER_STUDENT });

	res.status(200).json({ msg: "Student has been deleted successfully" });
};
