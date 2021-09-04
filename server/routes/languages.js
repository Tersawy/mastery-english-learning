const router = require("express").Router();

const LanguageController = require("../Controllers/LanguageController");

router.get("/", LanguageController.all);

router.get("/options", LanguageController.options);

router.post("/", LanguageController.create);

router.put("/:languageId", LanguageController.update);

router.delete("/:languageId", LanguageController.remove);

module.exports = router;
