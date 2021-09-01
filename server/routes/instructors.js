const router = require("express").Router();

const { auth, admin } = require("../middlewares/auth");

const InstructoController = require("../Controllers/InstructoController");

router.get("/", auth, admin, InstructoController.instructors);

router.post("/", auth, admin, InstructoController.create);

router.put("/:instructorId", auth, admin, InstructoController.update);

router.delete("/:instructorId", auth, admin, InstructoController.remove);

module.exports = router;
