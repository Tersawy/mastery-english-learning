const router = require("express").Router();

const CourseController = require("../Controllers/CourseController");

const { auth, getAuth, allowedFor } = require("../middlewares/auth");

const { OWNER, ADMIN, INSTRUCTOR, STUDENT } = require("../helpers/constants");

router.get("/", auth, allowedFor(OWNER, ADMIN, INSTRUCTOR), CourseController.all);

router.get("/my-courses", auth, allowedFor(STUDENT), CourseController.myCourses);

router.post("/", auth, allowedFor(OWNER, ADMIN, INSTRUCTOR), CourseController.create);

router.get("/:courseId", getAuth, CourseController.show);

router.get("/:courseId/detail", auth, allowedFor(OWNER, ADMIN, INSTRUCTOR), CourseController.detail);

router.get("/:courseId/detail/students", auth, allowedFor(OWNER, ADMIN, INSTRUCTOR), CourseController.studentCourse);

router.get("/:courseId/detail/sections/:sectionId/lectures", auth, allowedFor(OWNER, ADMIN, INSTRUCTOR), CourseController.courseSectionLectures);

router.get("/:courseId/start", auth, allowedFor(STUDENT), CourseController.start);

router.get("/:courseId/edit", auth, allowedFor(OWNER, ADMIN, INSTRUCTOR), CourseController.edit);

router.put("/:courseId", auth, allowedFor(OWNER, ADMIN, INSTRUCTOR), CourseController.update);

router.post("/:courseId/change-status", auth, allowedFor(OWNER, ADMIN, INSTRUCTOR), CourseController.changeStatus);

router.delete("/:courseId", auth, allowedFor(OWNER, ADMIN, INSTRUCTOR), CourseController.remove);

//====================================================================================================================//
//---------------------------------------------> Start Sections <-----------------------------------------------------//
//====================================================================================================================//

const SectionController = require("../Controllers/SectionController");

const sectionsURL = "/:courseId/sections";

router.get(sectionsURL, SectionController.all);

router.get(`${sectionsURL}/:sectionId`, SectionController.show);

router.post(sectionsURL, auth, allowedFor(OWNER, ADMIN, INSTRUCTOR), SectionController.create);

router.put(`${sectionsURL}/:sectionId`, auth, allowedFor(OWNER, ADMIN, INSTRUCTOR), SectionController.update);

router.delete(`${sectionsURL}/:sectionId`, auth, allowedFor(OWNER, ADMIN, INSTRUCTOR), SectionController.remove);

//====================================================================================================================//
//---------------------------------------------> Start Section Quiz <-----------------------------------------------------//
//====================================================================================================================//

const SectionQuizController = require("../Controllers/SectionQuizController");

const sectionQuizURL = "/sections/:sectionId/quiz";

router.get(sectionQuizURL, auth, SectionQuizController.show);

router.post(sectionQuizURL, auth, allowedFor(OWNER, ADMIN, INSTRUCTOR), SectionQuizController.create);

router.put(`${sectionQuizURL}/:quizId`, auth, allowedFor(OWNER, ADMIN, INSTRUCTOR), SectionQuizController.update);

router.delete(`${sectionQuizURL}/:quizId`, auth, allowedFor(OWNER, ADMIN, INSTRUCTOR), SectionQuizController.remove);

//====================================================================================================================//
//---------------------------------------------> Start Section Quiz Questions <-----------------------------------------------------//
//====================================================================================================================//

const SectionQuestionController = require("../Controllers/SectionQuestionController");

const sectionQuestionURL = "/sections/quiz/:quizId/questions";

router.post(sectionQuestionURL, auth, allowedFor(OWNER, ADMIN, INSTRUCTOR), SectionQuestionController.create);

router.put(`${sectionQuestionURL}/:questionId`, auth, allowedFor(OWNER, ADMIN, INSTRUCTOR), SectionQuestionController.update);

router.delete(`${sectionQuestionURL}/:questionId`, auth, allowedFor(OWNER, ADMIN, INSTRUCTOR), SectionQuestionController.remove);

//====================================================================================================================//
//---------------------------------------------> Start Lectures <-----------------------------------------------------//
//====================================================================================================================//

const LectureController = require("../Controllers/LectureController");

const lecturesURL = "/sections/:sectionId/lectures";

router.post(lecturesURL, auth, allowedFor(OWNER, ADMIN, INSTRUCTOR), LectureController.create);

router.put(`${lecturesURL}/:lectureId`, auth, allowedFor(OWNER, ADMIN, INSTRUCTOR), LectureController.update);

router.delete(`${lecturesURL}/:lectureId`, auth, allowedFor(OWNER, ADMIN, INSTRUCTOR), LectureController.remove);

router.post(`${lecturesURL}/:lectureId/upload-video`, auth, allowedFor(OWNER, ADMIN, INSTRUCTOR), LectureController.uploadVideo);

router.post(`${lecturesURL}/:lectureId/change-video`, auth, allowedFor(OWNER, ADMIN, INSTRUCTOR), LectureController.changeVideo);

router.post(`${lecturesURL}/:lectureId/change-review`, auth, allowedFor(OWNER, ADMIN, INSTRUCTOR), LectureController.changeReview);

//====================================================================================================================//
//---------------------------------------------> Start Quizzes <-----------------------------------------------------//
//====================================================================================================================//

const QuizController = require("../Controllers/QuizController");

const quizURL = "/sections/lectures/:lectureId/quiz";

router.get(quizURL, auth, QuizController.show);

router.post(quizURL, auth, allowedFor(OWNER, ADMIN, INSTRUCTOR), QuizController.create);

router.delete(`${quizURL}/:quizId`, auth, allowedFor(OWNER, ADMIN, INSTRUCTOR), QuizController.remove);

//====================================================================================================================//
//---------------------------------------------> Start Questions <-----------------------------------------------------//
//====================================================================================================================//

const QuestionController = require("../Controllers/QuestionController");

const questionURL = "/sections/lectures/quiz/:quizId/questions";

router.post(questionURL, auth, allowedFor(OWNER, ADMIN, INSTRUCTOR), QuestionController.create);

router.put(`${questionURL}/:questionId`, auth, allowedFor(OWNER, ADMIN, INSTRUCTOR), QuestionController.update);

router.delete(`${questionURL}/:questionId`, auth, allowedFor(OWNER, ADMIN, INSTRUCTOR), QuestionController.remove);

//====================================================================================================================//
//---------------------------------------------> Start Student Answers <----------------------------------------------//
//====================================================================================================================//

const SectionQuizAnswerController = require("../Controllers/SectionQuizAnswerController");

const sectionQuizAnswerURL = "/:courseId/sections/quiz/:quizId/answer";

router.post(sectionQuizAnswerURL, auth, allowedFor(STUDENT), SectionQuizAnswerController.answer);

const QuizAnswerController = require("../Controllers/QuizAnswerController");

const quizAnswerURL = "/:courseId/sections/lectures/quiz/:quizId/question/:questionId/answer";

router.post(quizAnswerURL, auth, allowedFor(STUDENT), QuizAnswerController.answer);

module.exports = router;
