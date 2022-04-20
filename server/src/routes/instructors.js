const router = require("express").Router();

const { auth, allowedFor } = require("../middlewares/auth");

const { OWNER, ADMIN } = require("../helpers/constants");

const InstructorController = require("../Controllers/InstructorController");

router.get("/", auth, allowedFor(OWNER, ADMIN), InstructorController.instructors);

router.post("/", auth, allowedFor(OWNER, ADMIN), InstructorController.create);

router.post("/:instructorId", auth, allowedFor(OWNER, ADMIN), InstructorController.changeActivation);

router.put("/:instructorId", auth, allowedFor(OWNER, ADMIN), InstructorController.update);

router.delete("/:instructorId", auth, allowedFor(OWNER, ADMIN), InstructorController.remove);

module.exports = router;
