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

const CourseSectionController = require("../Controllers/CourseSectionController");

const sectionsURL = "/:courseId/sections";

router.get(sectionsURL, CourseSectionController.all);

router.get(`${sectionsURL}/:sectionId`, CourseSectionController.show);

router.post(sectionsURL, auth, instructorAndAdmin, CourseSectionController.create);

router.put(`${sectionsURL}/:sectionId`, auth, instructorAndAdmin, CourseSectionController.update);

router.delete(`${sectionsURL}/:sectionId`, auth, instructorAndAdmin, CourseSectionController.remove);

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

const quizzesURL = "/sections/lectures/:lectureId/quizzes";

router.post(quizzesURL, auth, instructorAndAdmin, QuizController.create);

router.get(`${sectionsURL}/:quizId`, auth, instructorAndAdmin, QuizController.show);

// router.put(`${quizzesURL}/:quizId`, auth, instructorAndAdmin, update);

// router.delete(`${quizzesURL}/:quizId`, auth, instructorAndAdmin, remove);

module.exports = router;
