const router = require("express").Router();

const LevelController = require("../Controllers/LevelController");

const { auth, allowedFor } = require("../middlewares/auth");

const { OWNER, ADMIN } = require( "../helpers/constants" );

router.get("/", auth, allowedFor(OWNER, ADMIN), LevelController.all);

router.get("/options", LevelController.options);

router.post("/", auth, allowedFor(OWNER, ADMIN), LevelController.create);

router.put("/:levelId", auth, allowedFor(OWNER, ADMIN), LevelController.update);

router.delete("/:levelId", auth, allowedFor(OWNER, ADMIN), LevelController.remove);

module.exports = router;
