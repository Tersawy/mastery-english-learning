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
	const { courseId, quizId } = req.params;

	const { me, answers } = req.body;

	let audiosAnswers = req.files.answers;

	if (!me.courses.includes(courseId)) {
		return res.status(403).json({ msg: "Please enroll for this course first" });
	}

	let getQuizAnswer = QuizAnswer.findOne({ quiz: quizId, student: me._id });

	let getQuiz = Quiz.findById(quizId);

	let [quizAnswer, quiz] = await Promise.all([getQuizAnswer, getQuiz]);

	if (quizAnswer) return res.status(422).json({ msg: "You have already answered" });

	quizAnswer = quizAnswer || new QuizAnswer({ quiz: quizId, student: me._id });

	if (audiosAnswers) {
		let newAnswer = await handleAudioAnswer(audiosAnswers)

		answers.push(newAnswer)
	}
	
	let quizQuestionsIds = quiz.questions.map((q) => q._id);

	quizAnswer.answers = answers.filter((a) => quizQuestionsIds.includes(a.question));

	quizAnswer.answers = quizAnswer.answers.map((answer) => {
		let question = quiz.questions.find((q) => q._id.toString() == answer.question.toString());

		let isEssay = question.type == QUESTION_ESSAY;

		let isRightAnswer = JSON.stringify(question.answer).toString().toLocaleLowerCase() == JSON.stringify(answer.value).toString().toLocaleLowerCase();

		let isTrueOrFalse = question.type == QUESTION_TRUE_OR_FALSE;

		if (isTrueOrFalse) {
			isRightAnswer = String(question.answer).toLocaleLowerCase() == String(answer.value).toLocaleLowerCase();

			answer.value = String(answer.value) === "true" ? true : false;
		}

		answer.isTrue = !isEssay && isRightAnswer;

		answer.isCorrected = !isEssay;

		return answer;
	});

	await quizAnswer.save();

	res.json("Your answers has been saved successfully");
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
					if (err) return reject(err);
	
					if (existsSync(tempFilePath)) unlinkSync(tempFilePath);
	
					if (existsSync(audioDir)) unlinkSync(audioDir);
	
					let audioAnswer = { question: questionId, value: results[0] };
	
					resolve(audioAnswer);
				});
			});
		}
	})
}
