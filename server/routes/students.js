const router = require("express").Router();

const { auth, admin, student } = require("../middlewares/auth");

const StudentController = require("../Controllers/StudentController");

router.get("/", auth, admin, StudentController.students);

router.post("/", auth, admin, StudentController.create);

router.put("/:studentId", auth, admin, StudentController.update);

router.post("/:studentId/enroll", auth, admin, StudentController.enroll);

router.post("/:courseId/enroll", auth, student, StudentController.selfEnroll);

router.delete("/:studentId", auth, admin, StudentController.remove);

module.exports = router;
