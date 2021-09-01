const jwt = require("jsonwebtoken");

const User = require("../Models/User");

const fs = require("fs");

const { USER_ADMIN, USER_INSTRUCTOR, USER_STUDENT, USER_OWNER } = require("../helpers/constants");

const publicKey = fs.readFileSync("jwtRS256.key.pub", "utf8");

const permissionError = { msg: "Sorry, You Don't Have Any Permissions To Do That" };

module.exports = {
	auth: (req, res, next) => {
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

			req.body.me = _user;

			next();
		});
	},

	student: (req, res, next) => {
		if (req.body.me.type != USER_STUDENT) return res.status(403).json(permissionError);
		next();
	},

	instructor: (req, res, next) => {
		if (req.body.me.type != USER_INSTRUCTOR) return res.status(403).json(permissionError);
		next();
	},

	admin: (req, res, next) => {
		let type = req.body.me.type;
		if (type != USER_ADMIN && type != USER_OWNER) return res.status(403).json(permissionError);
		next();
	},

	owner: (req, res, next) => {
		if (req.body.me.type != USER_OWNER) return res.status(403).json(permissionError);
		next();
	},

	instructorAndAdmin: (req, res, next) => {
		let type = req.body.me.type;
		if (type != USER_INSTRUCTOR && type != USER_ADMIN && type != USER_OWNER)
			return res.status(403).json(permissionError);
		next();
	},
};
