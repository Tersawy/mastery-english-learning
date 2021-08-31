const router = require("express").Router();

const LevelController = require("../Controllers/LevelController");

router.get("/", LevelController.all);

router.get("/options", LevelController.options);

router.post("/", LevelController.create);

module.exports = router;
