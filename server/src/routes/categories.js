const router = require("express").Router();

const CategoryController = require("../Controllers/CategoryController");

const { auth, allowedFor } = require("../middlewares/auth");

const { OWNER, ADMIN } = require( "../helpers/constants" );

router.get("/", auth, allowedFor(OWNER, ADMIN), CategoryController.all);

router.get("/options", CategoryController.options);

router.post("/", auth, allowedFor(OWNER, ADMIN), CategoryController.create);

router.put("/:categoryId", auth, allowedFor(OWNER, ADMIN), CategoryController.update);

router.delete("/:categoryId", auth, allowedFor(OWNER, ADMIN), CategoryController.remove);

module.exports = router;
