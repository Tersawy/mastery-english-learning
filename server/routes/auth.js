const router = require("express").Router();

const AuthController = require("../Controllers/AuthController");

const { auth } = require("../middlewares/auth");

router.post("/me", AuthController.me);

router.post("/login", AuthController.login);

router.post("/register", AuthController.register);

router.post("/reset-password", AuthController.reset);

router.post("/verify", AuthController.verifyToken);

router.post("/new-password", AuthController.newPassword);

router.post("/update-profile", auth, AuthController.updateProfile);

router.post("/update-profile-image", auth, AuthController.changeImage);

module.exports = router;
