const mongoose = require("mongoose");
const SectionQuiz = require("../Models/SectionQuiz");

exports.create = async (req, res) => {
	let { sectionId: section } = req.params;

	let { questions } = req.body;

	let quiz = await SectionQuiz.findOne({ section });

	if (quiz) return res.status(422).json({ msg: "This section already has a quiz!" });

	quiz = new SectionQuiz({ section, questions });

	await quiz.save();

	res.json({ msg: "The quiz has been created successfully" });
};

exports.show = async (req, res) => {
	let { sectionId: section } = req.params;

	let { me, isStudent } = req.body;

	if (!isStudent) {
		let quiz = await SectionQuiz.findOne({ section });

		return res.json(quiz || {});
	}

	let aggregate = [
		{ $match: { section: mongoose.Types.ObjectId(section) } },
		{
			$lookup: {
				from: "sectionquizanswers",
				let: { quizId: "$_id" },
				as: "quizAnswer",
				pipeline: [{ $match: { $expr: { $and: [{ $eq: ["$quiz", "$$quizId"] }, { $eq: ["$student", me._id] }] } } }],
			},
		},
		{ $unwind: { path: "$quizAnswer", preserveNullAndEmptyArrays: true } },
	];

	let quiz = await SectionQuiz.aggregate(aggregate);

	quiz = quiz[0];

	if (!quiz) return res.json({});

	quiz.questions = quiz.questions.map((question) => {
		let q = {};

		q._id = question._id;
		q.choices = question.choices;
		q.text = question.text;
		q.type = question.type;

		if (!quiz.quizAnswer || !Array.isArray(quiz.quizAnswer.answers)) return q;

		let answer = quiz.quizAnswer.answers.find((a) => String(a.question) == String(question._id));

		if (answer) {
			q.isCorrected = answer.isCorrected; // used for question speech to display text
			q.isTrue = answer.isTrue;
			q.answer = answer.value;
		}

		return q;
	});

	quiz = {
		_id: quiz._id,
		passRate: quiz.quizAnswer ? quiz.quizAnswer.passRate : undefined,
		section: quiz.section,
		questions: quiz.questions,
	};

	res.json(quiz);
};

exports.remove = async (req, res) => {
	let { quizId } = req.params;

	await SectionQuiz.deleteOne({ _id: quizId });

	res.json({ msg: "The quiz has been deleted successfully" });
};
