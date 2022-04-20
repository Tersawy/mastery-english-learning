// const modalsActions = require("./modalsActions");

const WS = require("./socket");

const mongoose = require("mongoose");

const User = require("../Models/User");
const Chat = require("../Models/Chat");

module.exports = (socket) => {
	let userId = socket.decoded.userId;

	let _id = mongoose.Types.ObjectId(userId);

	WS.create(socket);

	socket.join(userId);

	// socket.join(WS.worldRoom);

	User.updateOne({ _id }, { isOnline: true }, () => socket.broadcast.emit("USER::ONLINE", userId));

	socket.on("USER::WRITE", (recipient) => socket.to(recipient).emit("USER::WRITE", userId));

	socket.on("USER::SEEN:MESSAGE", (msg) => {
		Chat.updateOne({ _id: msg._id }, { status: 3 }, () => socket.to(msg.sender).emit("USER::SEEN:MESSAGE", msg));
	});

	socket.on("USER::UNREADED:MESSAGE", (msg) => {
		Chat.updateOne({ _id: msg._id }, { status: 2 }, () => socket.to(msg.sender).emit("USER::UNREADED:MESSAGE", msg));
	});

	socket.on("USER::SEEN_ALL:MESSAGE", (sender) => {
		let cond = { recipient: userId, sender };

		Chat.updateMany(cond, { status: 3 }, () => socket.to(sender).emit("USER::SEEN_ALL:MESSAGE", userId));
	});

	Chat.updateMany({ recipient: userId, status: 1 }, { status: 2 }, () => {
		socket.broadcast.emit("USER::UNREADED_ALL:MESSAGE", userId);
	});

	socket.on("disconnect", () => {
		User.updateOne({ _id }, { isOnline: false }, () => socket.broadcast.emit("USER::OFFLINE", userId));

		console.log(socket.decoded.userId, "disconnected");

		WS.remove(socket.decoded.userId);
	});
};
