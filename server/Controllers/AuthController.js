const User = require("../Models/User");

const jwt = require("jsonwebtoken");

const crypto = require("crypto");

const bcrypt = require("bcrypt");

const fs = require("fs");
// const nodemailer = require("nodemailer");

// const sgMail = require("@sendgrid/mail");

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const privateKey = fs.readFileSync("jwtRS256.key", "utf8");
const publicKey = fs.readFileSync("jwtRS256.key.pub", "utf8");

exports.login = async (req, res) => {
	const { email, password } = req.body;

	let user = await User.findOne({ email, deleted_at: null });

	if (!user) throw { status: 401, msg: "Email or password are not valid" };

	let same = await bcrypt.compare(password, user.password);

	if (!same) throw { status: 401, msg: "Email or password are not valid" };

	const JWTPayload = { userId: user._id, type: user.type };

	const JWTSignOptions = { algorithm: "RS256", expiresIn: "8h" };

	jwt.sign(JWTPayload, privateKey, JWTSignOptions, async (err, token) => {
		if (err) throw err;

		user = {
			id: user.id,
			fullname: user.fullname,
			username: user.username,
			phone: user.phone,
			email: user.email,
			type: user.type,
		};

		res.json({ status: 200, token, user });
	});
};

exports.register = async (req, res) => {
	const { username, fullname, phone, email, password, type } = req.body;

	let passwordHashed = await bcrypt.hash(password, 10);

	let userType = type ? 1 : 0;

	let user = { username, fullname, phone, email, password: passwordHashed, type: userType };

	user = new User(user);

	await user.save();

	res.status(200).json({ msg: "You're Welcome, you can now sign in" });
};

exports.me = (req, res) => {
	let token = req.headers.authorization;

	if (!token || token == "undefined") {
		throw { status: 401, msg: "Unauthentication" };
	}

	const JWTVerifyOptions = { algorithms: ["RS256"] };

	jwt.verify(token, publicKey, JWTVerifyOptions, async (err, decoded) => {
		if (err) return res.status(401).json({ msg: "Unauthentication" });

		let userQuery = { _id: decoded.userId, deleted_at: null };

		let user = await User.findOne(userQuery, { password: 0 });

		if (!user) throw { status: 401, msg: "Unauthentication" };

		let _user = { ...user._doc };

		return res.json({ status: 200, user: _user });
	});
};

exports.reset = (req, res) => {
	const { email } = req.body;

	crypto.randomBytes(32, async (err, buffer) => {
		if (err) throw err;

		const token = buffer.toString("hex");

		let _user = await User.findOne({ email, deleted_at: null });

		if (!_user) throw { status: 422, errors: { email: "Email doesn't exist !" } };

		_user.remmemberToken = token;

		_user.expiresToken = Date.now() + 1200000;

		await _user.save();

		let url = `http://localhost:8080/reset-password/${token}`;

		const msg = {
			to: _user.email,
			from: process.env.EMAIL,
			subject: "🌻 CRM Password Reset 🌻",
			text: "and easy to do anywhere, even with Node.js",
			html: `
          <p>Hey ${_user.username},</p>
          <p>We heard that you lost your CRM password. Sorry about that!</p>
          <p>But don’t worry! You can use the following link to reset your password:</p>
          <a href=${url}>${url}</a>
          <p>If you don’t use this link within 20 minutes, it will expire.</p>
          <p>Do something outside today! </p>
          <p>–Your friends at CRM</p>
          `,
		};

		await sgMail.send(msg);

		res.json({ status: 200, msg: "Email sent" });
	});
};

exports.newPassword = async (req, res) => {
	const { token, password } = req.body;

	let _user = await User.findOne({ remmemberToken: token, expiresToken: { $gt: Date.now() }, deleted_at: null });

	if (!_user) throw { status: 404, msg: "Url has been expired !" };

	let _password = await bcrypt.hash(password, 10);

	_user.password = _password;

	_user.remmemberToken = null;

	await _user.save();

	res.json({ status: 200, msg: "password has been changed successfuly" });
};

exports.verifyToken = async (req, res) => {
	const { token } = req.body;

	if (!token) throw { status: 404, msg: "Url has been expired !" };

	let user = await User.findOne({ remmemberToken: token, expiresToken: { $gt: Date.now() }, deleted_at: null });

	if (!user) throw { status: 404, msg: "Url has been expired !" };

	res.json({ status: 200 });
};
