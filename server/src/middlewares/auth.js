const User = require("../Models/User");

const JWT = require("../services/jwt");

const { ADMIN, INSTRUCTOR, STUDENT, OWNER } = require("../helpers/constants");

const permissionError = { msg: "Sorry, You Don't Have Any Permissions To Do That" };

module.exports = {
	async auth(req, res, next) {
		let token = req.headers.authorization;

		if (!token || token == "undefined") {
			throw { status: 401, msg: "Unauthentication" };
		}

		let [err, decoded] = await JWT.verify(token);

		if (err) return res.status(401).json({ msg: "Unauthentication" });

		let userQuery = { _id: decoded.userId, deleted_at: null };

		let user = await User.findOne(userQuery, { password: 0 });

		if (!user) return res.status(401).json({ msg: "Unauthentication" });

		if (!user.isActive) return res.status(403).json({ msg: "Wait for activation" });

		let _user = { ...user._doc };

		req.body.me = _user;

		req.body.isAuth = true;
		req.body.isStudent = req.body.me.type == STUDENT;
		req.body.isInstructor = req.body.me.type == INSTRUCTOR;
		req.body.isAdmin = req.body.me.type == ADMIN;
		req.body.isOwner = req.body.me.type == OWNER;

		next();
	},

	async getAuth(req, res, next) {
		let token = req.headers.authorization;

		if (!token || token == "undefined") {
			req.body.me = null;
			return next();
		}

		let [err, decoded] = await JWT.verify(token);

		if (err) {
			req.body.me = null;
			return next();
		}

		let userQuery = { _id: decoded.userId, isActive: true, deleted_at: null };

		let user = await User.findOne(userQuery, { password: 0 });

		if (!user) {
			req.body.me = null;
			return next();
		}

		let _user = { ...user._doc };

		req.body.me = _user;

		req.body.isAuth = true;
		req.body.isStudent = req.body.me.type == STUDENT;
		req.body.isInstructor = req.body.me.type == INSTRUCTOR;
		req.body.isAdmin = req.body.me.type == ADMIN;
		req.body.isOwner = req.body.me.type == OWNER;

		next();
	},

	allowedFor(...userTypes) {
		return function (req, res, next) {
			if (!userTypes.includes(req.body.me.type)) return res.status(403).json(permissionError);
			next();
		}
	}
};
