const router = require("express").Router();

const CourseController = require("../Controllers/CourseController");

const { auth, instructorAndAdmin, getAuth } = require("../middlewares/auth");

router.get("/", auth, instructorAndAdmin, CourseController.all);

router.post("/", auth, instructorAndAdmin, CourseController.create);

router.get("/:courseId", getAuth, CourseController.show);

router.get("/:courseId/edit", auth, instructorAndAdmin, CourseController.edit);

router.put("/:courseId", auth, instructorAndAdmin, CourseController.update);

router.post("/:courseId/change-status", auth, instructorAndAdmin, CourseController.changeStatus);

router.delete("/:courseId", auth, instructorAndAdmin, CourseController.remove);

//====================================================================================================================//
//---------------------------------------------> Start Sections <-----------------------------------------------------//
//====================================================================================================================//

const SectionController = require("../Controllers/SectionController");

const sectionsURL = "/:courseId/sections";

router.get(sectionsURL, SectionController.all);

router.get(`${sectionsURL}/:sectionId`, SectionController.show);

router.post(sectionsURL, auth, instructorAndAdmin, SectionController.create);

router.put(`${sectionsURL}/:sectionId`, auth, instructorAndAdmin, SectionController.update);

router.delete(`${sectionsURL}/:sectionId`, auth, instructorAndAdmin, SectionController.remove);

//====================================================================================================================//
//---------------------------------------------> Start Lectures <-----------------------------------------------------//
//====================================================================================================================//

const LectureController = require("../Controllers/LectureController");

const lecturesURL = "/sections/:sectionId/lectures";

router.post(lecturesURL, auth, instructorAndAdmin, LectureController.create);

router.put(`${lecturesURL}/:lectureId`, auth, instructorAndAdmin, LectureController.update);

router.delete(`${lecturesURL}/:lectureId`, auth, instructorAndAdmin, LectureController.remove);

router.post(`${lecturesURL}/:lectureId/upload-video`, auth, instructorAndAdmin, LectureController.uploadVideo);

router.post(`${lecturesURL}/:lectureId/change-video`, auth, instructorAndAdmin, LectureController.changeVideo);

//====================================================================================================================//
//---------------------------------------------> Start Quizzes <-----------------------------------------------------//
//====================================================================================================================//

const QuizController = require("../Controllers/QuizController");

const quizURL = "/sections/lectures/:lectureId/quiz";

router.get(quizURL, auth, QuizController.show);

router.post(quizURL, auth, instructorAndAdmin, QuizController.create);

router.delete(`${quizURL}/:quizId`, auth, instructorAndAdmin, QuizController.remove);

//====================================================================================================================//
//---------------------------------------------> Start Questions <-----------------------------------------------------//
//====================================================================================================================//

const QuestionController = require("../Controllers/QuestionController");

const questionURL = "/sections/lectures/quiz/:quizId/questions";

router.post(questionURL, auth, instructorAndAdmin, QuestionController.create);

router.put(`${questionURL}/:questionId`, auth, instructorAndAdmin, QuestionController.update);

router.delete(`${questionURL}/:questionId`, auth, instructorAndAdmin, QuestionController.remove);

module.exports = router;
