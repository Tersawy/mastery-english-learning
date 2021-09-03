const router = require("express").Router();

const PagesController = require("../Controllers/PagesController");

router.get("/home", PagesController.home);

module.exports = router;
