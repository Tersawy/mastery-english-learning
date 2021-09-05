const router = require("express").Router();

const CourseController = require("../Controllers/CourseController");

const { auth, instructorAndAdmin, getAuth } = require("../middlewares/auth");

router.get("/", auth, instructorAndAdmin, CourseController.all);

router.get("/:courseId", getAuth, CourseController.show);

router.get("/:courseId/edit", auth, instructorAndAdmin, CourseController.edit);

router.put("/:courseId", auth, instructorAndAdmin, CourseController.update);

router.post("/:courseId/change-status", auth, instructorAndAdmin, CourseController.changeStatus);

router.delete("/:courseId", auth, instructorAndAdmin, CourseController.remove);

router.post("/", auth, instructorAndAdmin, CourseController.create);

module.exports = router;
