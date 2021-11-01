const router = require("express").Router();

const { auth, allowedFor } = require("../middlewares/auth");

const { OWNER, ADMIN, STUDENT } = require( "../helpers/constants" );

const StudentController = require("../Controllers/StudentController");

router.get("/", auth, allowedFor(OWNER, ADMIN), StudentController.students);

router.post("/", auth, allowedFor(OWNER, ADMIN), StudentController.create);

router.put("/:studentId", auth, allowedFor(OWNER, ADMIN), StudentController.update);

router.post("/enroll", auth, allowedFor(STUDENT), StudentController.selfEnroll);

router.post("/:studentId", auth, allowedFor(OWNER, ADMIN), StudentController.changeActivation);

router.post("/:studentId/enroll", auth, allowedFor(OWNER, ADMIN), StudentController.enroll);

router.delete("/:studentId", auth, allowedFor(OWNER, ADMIN), StudentController.remove);

module.exports = router;
