const router = require("express").Router();

const CategoryController = require("../Controllers/CategoryController");

router.get("/", CategoryController.all);

router.get("/options", CategoryController.options);

router.post("/", CategoryController.create);

module.exports = router;
