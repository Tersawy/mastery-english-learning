const SectionQuiz = require("../Models/SectionQuiz");

exports.create = async (req, res) => {
	let { quizId } = req.params;

	let { text, type, choices, answer } = req.body;

	let quiz = { text, type, choices, answer };

	await SectionQuiz.updateOne({ _id: quizId }, { $push: { questions: quiz } });

	res.json({ msg: "The question has been created successfully" });
};

exports.update = async (req, res) => {
	let { quizId, questionId } = req.params;

	let { text, type, choices, answer } = req.body;

	let queryCondition = { _id: quizId, "questions._id": questionId };

	let data = {
		$set: {
			"questions.$.text": text,
			"questions.$.type": type,
			"questions.$.choices": choices,
			"questions.$.answer": answer,
		},
	};

	await SectionQuiz.updateOne(queryCondition, data);

	res.json({ msg: "The question has been updated successfully" });
};

exports.remove = async (req, res) => {
	let { quizId, questionId } = req.params;

	let sectionQuiz = await SectionQuiz.findOne({ _id: quizId });

	if (sectionQuiz) {
		sectionQuiz.questions = sectionQuiz.questions.filter((question) => question._id.toString() != questionId);

		if (!sectionQuiz.questions.length) {
			await SectionQuiz.deleteOne({ _id: quizId });

			return res.json({ msg: "The question has been deleted successfully" });
		}

		await sectionQuiz.save();
	}

	res.json({ msg: "The question has been deleted successfully" });
};
