const Quiz = require("../Models/Quiz");

exports.all = async (req, res) => {
	let query = { deleted_at: null };

	let quizzes = Quiz.find(query);

	let quizzesCount = Quiz.countDocuments(query);

	let [docs, total] = await Promise.all([quizzes, quizzesCount]);

	return res.json({ docs, total });
};

exports.create = async (req, res) => {
	console.log(req.body);
};

exports.show = async (req, res) => {
	console.log(req.body);
};
