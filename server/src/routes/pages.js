const router = require("express").Router();

const PagesController = require("../Controllers/PagesController");

const { ADMIN, INSTRUCTOR, OWNER } = require("../helpers/constants");

const { getAuth, auth, allowedFor } = require("../middlewares/auth");

router.get("/home", getAuth, PagesController.home);

router.get("/dashboard", auth, allowedFor(ADMIN, INSTRUCTOR, OWNER), PagesController.dashboard);

module.exports = router;
