const JWT = require("../services/jwt");

const listeners = require("./listeners");

module.exports = (io) => {
	io.use(async function (socket, next) {
		let token = socket.handshake.query && socket.handshake.query.token ? socket.handshake.query.token : false;

		let [err, decoded] = await JWT.verify(token);

		if (err) return next(new Error("Authentication error"));

		if (!decoded) return next(new Error("Authentication error"));

		socket.decoded = decoded;

		next();
	});

	io.on("connection", (socket) => listeners(socket, io));
};
