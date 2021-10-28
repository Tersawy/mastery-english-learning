const mongoose = require( "mongoose" );
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

	let { me, isStudent } = req.body;

	if (!isStudent) {
		let quiz = await Quiz.findOne({ lecture });

		return res.json(quiz || {});
	}

	let aggregate = [
		{ $match: { lecture: mongoose.Types.ObjectId(lecture) } },
		{
			$lookup: {
				from: "quizanswers",
				let: { quizId: "$_id" },
				as: "quizAnswer",
				pipeline: [
					{ $match: { $expr: { $and: [{ $eq: ["$quiz", "$$quizId"] }, { $eq: ["$student", me._id] }] } } }
				]
			}
		},
		{ $unwind: { path: "$quizAnswer", preserveNullAndEmptyArrays: true} }
	];

	let quiz = await Quiz.aggregate(aggregate)
	
	quiz = quiz[0]
	
	if (!quiz) return res.json({});
	
	quiz.questions = quiz.questions.map(question => {
		let q = {};

		q._id = question._id;
		q.choices = question.choices;
		q.text = question.text;
		q.type = question.type;

		let answer = quiz.quizAnswer.answers.find(a => String(a.question) == String(question._id));

		if (answer) {
			q.isCorrected = answer.isCorrected;
			q.isTrue = answer.isTrue;
			q.answer = answer.value;
			q.defaultAnswer = question.answer;
		}

		return q;
	})
	
	quiz = {
		_id: quiz._id,
		isAnswered: !!quiz.quizAnswer,
		lecture: quiz.lecture,
		questions: quiz.questions
	}
	
	res.json(quiz);
};

exports.remove = async (req, res) => {
	let { quizId } = req.params;

	await Quiz.deleteOne({ _id: quizId });

	res.json({ msg: "The quiz has been deleted successfully" });
};
