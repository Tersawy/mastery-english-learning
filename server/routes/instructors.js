const router = require("express").Router();

const { auth, admin } = require("../middlewares/auth");

const InstructorController = require("../Controllers/InstructorController");

router.get("/", auth, admin, InstructorController.instructors);

router.post("/", auth, admin, InstructorController.create);

router.post("/:instructorId", auth, admin, InstructorController.changeActivation);

router.put("/:instructorId", auth, admin, InstructorController.update);

router.delete("/:instructorId", auth, admin, InstructorController.remove);

module.exports = router;
