const Jwt = require("jsonwebtoken");

const listeners = require("./listeners");

const fs = require("fs");

const publicKey = fs.readFileSync("jwtRS256.key.pub", "utf8");

const JWTVerifyOptions = { algorithms: ["RS256"] };

module.exports = (io) => {
	io.use(function (socket, next) {
		let token = socket.handshake.query && socket.handshake.query.token ? socket.handshake.query.token : false;

		if (token) {
			Jwt.verify(token, publicKey, JWTVerifyOptions, (err, decoded) => {
				if (err) return next(new Error("Authentication error"));

				if (!decoded) return next(new Error("Authentication error"));

				socket.decoded = decoded;

				next();
			});
		} else next(new Error("Authentication error"));
	});

	io.on("connection", (socket) => listeners(socket, io));
};
