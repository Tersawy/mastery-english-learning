const router = require("express").Router();

const AuthController = require("../Controllers/AuthController");

router.post("/me", AuthController.me);

router.post("/login", AuthController.login);

router.post("/register", AuthController.register);

router.post("/reset-password", AuthController.reset);

router.post("/verify", AuthController.verifyToken);

router.post("/new-password", AuthController.newPassword);

module.exports = router;
