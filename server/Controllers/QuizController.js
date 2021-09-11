const Quiz = require("../Models/Quiz");

exports.create = async (req, res) => {
	let { lectureId: lecture } = req.params;

	let { questions } = req.body;

	let quiz = new Quiz({ lecture, questions });

	await quiz.save();

	res.json({ msg: "The quiz has been created successfully" });
};

exports.show = async (req, res) => {
	let { lectureId: lecture } = req.params;

	let quiz = await Quiz.findOne({ lecture });

	res.json(quiz || {});
};

exports.remove = async (req, res) => {
	let { quizId } = req.params;

	await Quiz.deleteOne({ _id: quizId });

	res.json({ msg: "The quiz has been deleted successfully" });
};
