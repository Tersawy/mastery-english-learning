const { QUESTION_ESSAY, QUESTION_TRUE_OR_FALSE } = require("../helpers/constants");

const SectionQuizAnswer = require("../Models/SectionQuizAnswer");

const SectionQuiz = require("../Models/SectionQuiz");

const Answer = require("../Models/SectionQuizAnswer");

const path = require("path");

const { randomChar, areTheyEqual } = require("../helpers/functions");

const PythonShell = require("python-shell").PythonShell;

const { unlinkSync, existsSync } = require("fs");

const audiosDir = path.resolve(__dirname, "../../public/audios");

exports.answer = async (req, res) => {
	const { courseId, quizId } = req.params;

	const { me, answers = [] } = req.body;

	let audiosAnswers = req.files.answers;

	if (!me.courses.includes(courseId)) {
		return res.status(403).json({ msg: "Please enroll for this course first" });
	}

	let getSectionQuizAnswer = SectionQuizAnswer.findOne({ quiz: quizId, student: me._id });

	let getSectionQuiz = SectionQuiz.findById(quizId);

	let [quizAnswer, quiz] = await Promise.all([getSectionQuizAnswer, getSectionQuiz]);

	if (!quiz) return res.status(404).json({ msg: "Quiz is not found !" });

	if (quizAnswer) {
		if (quizAnswer.passRate >= quiz.minimumPassRate) {
			return res.status(422).json({ msg: "You have already answered" });
		}

		quizAnswer.attempts += 1;

		quizAnswer.answers = [];
	}

	quizAnswer = quizAnswer || new SectionQuizAnswer({ quiz: quizId, student: me._id });

	quizAnswer.updatedAt = Date.now();

	if (audiosAnswers) {
		let newAnswer = await handleAudioAnswer(audiosAnswers);

		answers.push(newAnswer);
	}

	let quizQuestionsIds = quiz.questions.map((q) => q._id);

	quizAnswer.answers = answers.filter((a) => quizQuestionsIds.includes(a.question));

	let questionsExcludeEssay = quiz.questions.filter((question) => question.type != QUESTION_ESSAY);

	let totalQuestionsCount = questionsExcludeEssay.length;

	let rightAnswersCount = 0;

	quizAnswer.answers = quizAnswer.answers.map((answer) => {
		let question = quiz.questions.find((q) => q._id.toString() == answer.question.toString());

		let isEssay = question.type == QUESTION_ESSAY;

		let isTrueOrFalse = question.type == QUESTION_TRUE_OR_FALSE;

		if (isEssay) {
			answer.isCorrected = false;

			return answer;
		}

		if (isTrueOrFalse) {
			answer.value = String(answer.value) === "true" ? true : false;
		}

		answer.isTrue = areTheyEqual(answer.value, question.answer);

		rightAnswersCount = answer.isTrue ? rightAnswersCount + 1 : rightAnswersCount;

		answer.isCorrected = true;

		return answer;
	});

	let essayQuestions = quiz.questions.filter((question) => question.type == QUESTION_ESSAY);

	let isAllQuestionsAreEssay = essayQuestions.length == quiz.questions.length;

	if (isAllQuestionsAreEssay) {
		quizAnswer.passRate = 100;
	} else {
		quizAnswer.passRate = (rightAnswersCount * 100) / totalQuestionsCount;
	}

	await quizAnswer.save();

	res.json({ msg: "Your answers has been saved successfully", passRate: quizAnswer.passRate });
};

exports.show = async (req, res) => {
	const { quizId: quiz } = req.params;

	const {
		me: { _id: student },
	} = req.body;

	const answer = await Answer.findOne({ quiz, student });

	res.json(answer);
};

let handleAudioAnswer = (audiosAnswers) => {
	return new Promise((resolve, reject) => {
		for (let answer of audiosAnswers) {
			if (!answer) continue;

			let questionId = Object.keys(answer)[0];

			let audio = answer[questionId];

			let tempFilePath = path.resolve(audio.tempFilePath);

			let audioExtension = "wav";

			let audioName = `${randomChar(8)}_${Date.now()}.${audioExtension}`;

			let audioDir = path.resolve(audiosDir, audioName);

			audio.mv(audioDir, (err) => {
				if (err) return reject(err);

				var option = { scriptPath: "scripts", args: [audioDir] };

				PythonShell.run("recognition.py", option, function (err, results) {
					if (err) {
						console.log(err);
						return reject({ status: 422, msg: "please check your microphone and try again" });
					}

					if (existsSync(tempFilePath)) unlinkSync(tempFilePath);

					if (existsSync(audioDir)) unlinkSync(audioDir);

					let audioAnswer = { question: questionId, value: results[0] };

					resolve(audioAnswer);
				});
			});
		}
	});
};
