const { QUESTION_ESSAY, QUESTION_TRUE_OR_FALSE } = require("../helpers/constants");

const QuizAnswer = require("../Models/QuizAnswer");

const Quiz = require("../Models/Quiz");

const Answer = require("../Models/QuizAnswer");

const path = require("path");

const { randomChar } = require("../helpers/functions");

const PythonShell = require("python-shell").PythonShell;

const { unlinkSync, existsSync } = require( "fs" );

const audiosDir = path.resolve(__dirname, "../public/audios");

exports.answer = async (req, res) => {
	const { courseId, quizId, questionId } = req.params;

	let { me, value } = req.body;

	let answer = { question: questionId, value };

	let audioAnswer = req.files && req.files.value ? req.files.value : null;

	if (audioAnswer) {
		answer.value = await handleAudioAnswer(audioAnswer)
	}

	if (!me.courses.includes(courseId)) {
		return res.status(403).json({ msg: "Please enroll for this course first" });
	}

	let getQuizAnswer = QuizAnswer.findOne({ quiz: quizId, student: me._id });

	let getQuiz = Quiz.findById(quizId);

	let [quizAnswer, quiz] = await Promise.all([getQuizAnswer, getQuiz]);

	if (!quiz) return res.status(404).json({ msg: "Quiz is not found !" });

	let question = quiz.questions.find(question => question._id.toString() == questionId.toString());

	if (!question) return res.status(404).json({ msg: "This question doesn't exist in this quiz, Maybe removed by instructor" })

	quizAnswer = quizAnswer || new QuizAnswer({ quiz: quizId, student: me._id });

	let isEssay = question.type == QUESTION_ESSAY;

	let isRightAnswer = JSON.stringify(question.answer).toString().toLocaleLowerCase() == JSON.stringify(answer.value).toString().toLocaleLowerCase();

	let isTrueOrFalse = question.type == QUESTION_TRUE_OR_FALSE;

	if (isTrueOrFalse) {
		isRightAnswer = String(question.answer).toLocaleLowerCase() == String(answer.value).toLocaleLowerCase();

		answer.value = String(answer.value) === "true" ? true : false;
	}

	answer.isTrue = !isEssay && isRightAnswer;

	answer.isCorrected = !isEssay;

	let oldAnswerIndex = quizAnswer.answers.findIndex(answer => answer.question.toString() == questionId.toString());

	if (oldAnswerIndex > -1) {
		quizAnswer.answers[oldAnswerIndex] = answer;
	} else {
		quizAnswer.answers.push(answer);
	}

	await quizAnswer.save();

	res.json({ msg: "Your answers has been saved successfully" });
};

exports.show = async (req, res) => {
	const { quizId: quiz } = req.params;

	const {
		me: { _id: student },
	} = req.body;

	const answer = await Answer.findOne({ quiz, student });

	res.json(answer);
};

let handleAudioAnswer = (audio) => {
	return new Promise((resolve, reject) => {
		let tempFilePath = path.resolve(audio.tempFilePath);

		let audioExtension = "wav";

		let audioName = `${randomChar(8)}_${Date.now()}.${audioExtension}`;

		let audioDir = path.resolve(audiosDir, audioName);

		audio.mv(audioDir, (err) => {
			if (err) return reject(err);

			var option = { scriptPath: "scripts", args: [audioDir] };

			PythonShell.run("recognition.py", option, function (err, results) {
				if (err) {
					console.log(err)
					return reject({ status: 422, msg: "please check your microphone and try again" });
				}

				if (existsSync(tempFilePath)) unlinkSync(tempFilePath);

				if (existsSync(audioDir)) unlinkSync(audioDir);

				resolve(results[0]);
			});
		});
	})
}
