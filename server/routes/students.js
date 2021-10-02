const router = require("express").Router();

const { auth, admin, student } = require("../middlewares/auth");

const StudentController = require("../Controllers/StudentController");

router.get("/", auth, admin, StudentController.students);

router.post("/", auth, admin, StudentController.create);

router.post("/:studentId", auth, admin, StudentController.changeActivation);

router.put("/:studentId", auth, admin, StudentController.update);

router.post("/:studentId/enroll", auth, admin, StudentController.enroll);

router.post("/enroll", auth, student, StudentController.selfEnroll);

router.delete("/:studentId", auth, admin, StudentController.remove);

module.exports = router;
