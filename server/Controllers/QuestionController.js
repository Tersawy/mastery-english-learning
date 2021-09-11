const Quiz = require("../Models/Quiz");

exports.create = async (req, res) => {
	let { quizId } = req.params;

	let { text, type, choices } = req.body;

	let quiz = { text, type, choices };

	await Quiz.updateOne({ _id: quizId }, { $push: { questions: quiz } });

	res.json({ msg: "The question has been created successfully" });
};

exports.update = async (req, res) => {
	let { quizId, questionId } = req.params;

	let { text, type, choices } = req.body;

	let queryCondition = { _id: quizId, "questions._id": questionId };

	let data = { $set: { "questions.$.text": text, "questions.$.type": type, "questions.$.choices": choices } }
	
	await Quiz.updateOne(queryCondition, data);

	res.json({ msg: "The question has been updated successfully" });
};

exports.remove = async (req, res) => {
	let { quizId, questionId } = req.params;

	await Quiz.updateOne({ _id: quizId }, { $pull: { questions: { _id: questionId } } });

	res.json({ msg: "The question has been deleted successfully" });
};
