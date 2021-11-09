const router = require("express").Router();

const PagesController = require("../Controllers/PagesController");

const { getAuth } = require("../middlewares/auth");

router.get("/home", getAuth, PagesController.home);

module.exports = router;
