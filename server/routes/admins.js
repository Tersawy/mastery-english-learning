const router = require("express").Router();

const { auth, owner } = require("../middlewares/auth");

const AdminController = require("../Controllers/AdminController");

router.get("/", auth, owner, AdminController.admins);

router.post("/", auth, owner, AdminController.create);

router.put("/:adminId", auth, owner, AdminController.update);

router.delete("/:adminId", auth, owner, AdminController.remove);

module.exports = router;
