const router = require("express").Router();

const { auth, allowedFor } = require("../middlewares/auth");

const AdminController = require("../Controllers/AdminController");

const { OWNER } = require( "../helpers/constants" );

router.get("/", auth, allowedFor(OWNER), AdminController.admins);

router.post("/", auth, allowedFor(OWNER), AdminController.create);

router.post("/:adminId", auth, allowedFor(OWNER), AdminController.changeActivation);

router.put("/:adminId", auth, allowedFor(OWNER), AdminController.update);

router.delete("/:adminId", auth, allowedFor(OWNER), AdminController.remove);

module.exports = router;
