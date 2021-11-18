const mongoose = require( "mongoose" );
const { INSTRUCTOR, STUDENT, ADMIN, OWNER } = require("../helpers/constants");
const Chat = require("../Models/Chat");
const User = require("../Models/User");

const { getSocket, anySocket } = require("../ws/socket");

exports.contacts = async (req, res) => {
	const { me, isStudent, isInstructor } = req.body;

	const { search = "" } = req.query;

	let searchQuery = {
		$or: [
			{ username: { $regex: search, $options: "i" } },
			{ fullname: { $regex: search, $options: "i" } },
			{ phone: { $regex: search, $options: "i" } },
			{ email: { $regex: search, $options: "i" } },
			{ phone: { $regex: search, $options: "i" } }
		]
	};

	let query = { isActive: true };

	if (isStudent) {
		query = { ...query, type: { $in: [INSTRUCTOR, ADMIN, OWNER] }, ...searchQuery };
	} else if (isInstructor) {
		query = { ...query, $or: [{ type: { $in: [ADMIN, OWNER], ...searchQuery } }, { type: STUDENT, courses: { $in: me.courses }, ...searchQuery }] };
	}

	let msgQuery = {
		$or: [
			{ $and: [{ $eq: ["$recipient", "$$userId" ]}, { $eq: ["$sender", mongoose.Types.ObjectId(me._id)] }]  },
			{ $and: [{ $eq: ["$recipient", mongoose.Types.ObjectId(me._id) ]}, { $eq: ["$sender", "$$userId"] }]  },
		],
	};

	let unSeenMessagesCountQuery = { $and: [{ $ne: ["$status", 3] }, { $eq: ["$recipient", mongoose.Types.ObjectId(me._id)] }] };

	let aggregation = [
		{ $match: query },
		{ $project: { username: 1, image: 1, isOnline: 1, type: 1 } },
		{
			$lookup: {
				from: "chats",
				as: "_messages",
				let: { userId: "$_id" },
				pipeline: [
					{ $match: { $expr: msgQuery } },
					{ $sort: { createdAt: -1 } },
					{ $limit: 20 },
					{ $project: { text: "$message", status: 1, createdAt: 1, mine: { $eq: ["$sender", me._id] } } },
				],
			},
		},
		{
			$lookup: {
				from: "chats",
				as: "unSeenMessagesCount",
				let: { userId: "$_id" },
				pipeline: [
					{ $match: { $expr: { $and: [ msgQuery, unSeenMessagesCountQuery ] } } },
					{ $project: { _id: 1 } },
				],
			},
		},
		{ $project: {
			username: 1,
			image: 1,
			isOnline: 1,
			type: 1,
			messages: {
				docs: "$_messages",
				unSeenMessagesCount: { $size: "$unSeenMessagesCount" }},
		} }
	];

	let users = User.aggregate(aggregation);

	let total = User.countDocuments(query);

	let unSeenMessagesCount = Chat.countDocuments({ status: { $ne: 3 }, recipient: mongoose.Types.ObjectId(me._id) });

	[users, total, unSeenMessagesCount] = await Promise.all([users, total, unSeenMessagesCount]);

	res.json({ docs: users, total, unSeenMessagesCount });
};

exports.messages = async (req, res) => {
	const { me } = req.body;

	const { recipient } = req.params;

	let { skip } = req.query;

	let limit = 10;

	skip = parseInt(skip) || 0;
	
	let query = {
		$or: [
			{ recipient: mongoose.Types.ObjectId(recipient), sender: mongoose.Types.ObjectId(me._id) },
			{ recipient: mongoose.Types.ObjectId(me._id), sender: mongoose.Types.ObjectId(recipient) },
		],
	};

	let aggregation = [
		{ $match: query },
		{ $sort: { createdAt: -1 } },
		{ $skip: skip },
		{ $limit: limit },
		{
			$project: { text: "$message", status: 1, createdAt: 1, mine: { $eq: ["$sender", me._id] } },
		}
	];

	let messages = await Chat.aggregate(aggregation);

	res.json({ _id: recipient, messages: { docs: messages, skip: skip + limit } });
};

exports.newMessage = async (req, res) => {
	const { me, message, recipient } = req.body;

	let newMessage = new Chat({ sender: me._id, recipient, message });

	newMessage = await newMessage.save();

	newMessage = {
		_id: newMessage._id,
		text: newMessage.message,
		status: newMessage.status,
		createdAt: newMessage.createdAt,
		sender: newMessage.sender,
		recipient: newMessage.recipient,
		mine: false
	};

	let socket = getSocket(me._id) || anySocket();

	if (socket) {
		if (!getSocket(recipient)) {
			socket.emit("USER::OFFLINE", recipient);
			socket.broadcast.emit("USER::OFFLINE", recipient);
			await User.updateOne({ _id: recipient }, { isOnline: false });
		} else {
			socket.to(recipient).emit("USER::SEND:MESSAGE", newMessage);
		}
	}

	res.json({ ...newMessage, mine: true });
};
