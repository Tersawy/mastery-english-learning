const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let chatSchema = new Schema(
	{
		sender: {
			type: mongoose.Types.ObjectId,
			ref: "User",
			required: [true, "The sender is required !"],
		},
		recipient: {
			type: mongoose.Types.ObjectId,
			ref: "User",
			required: [true, "The recipient is required !"],
		},
		message: {
			type: String,
			required: [true, "The message is required"],
		},
		status: {
			type: Number,
			default: 1, // 1 sent - 2 unread - 3 seen
		},
	},
	{ timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Chat", chatSchema);
