const router = require("express").Router();

const { ADMIN, OWNER } = require("../helpers/constants");

const { allowedFor, auth } = require("../middlewares/auth");

const SettingController = require("../Controllers/SettingController");

router.get("/", SettingController.getSettings);

router.get("/show", auth, allowedFor(ADMIN, OWNER), SettingController.showSettings);

router.put("/", auth, allowedFor(ADMIN, OWNER), SettingController.updateSettings);

router.put("/home-page", auth, allowedFor(ADMIN, OWNER), SettingController.updateHomePage);

router.put("/student-courses-page", auth, allowedFor(ADMIN, OWNER), SettingController.updateStudentCoursesPage);

module.exports = router;
