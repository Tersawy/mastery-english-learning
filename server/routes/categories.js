const router = require("express").Router();

const CategoryController = require("../Controllers/CategoryController");

router.get("/", CategoryController.all);

router.get("/options", CategoryController.options);

router.post("/", CategoryController.create);

router.put("/:categoryId", CategoryController.update);

router.delete("/:categoryId", CategoryController.remove);

module.exports = router;
