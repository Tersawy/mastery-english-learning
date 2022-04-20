const router = require("express").Router();

const LanguageController = require("../Controllers/LanguageController");

const { auth, allowedFor } = require("../middlewares/auth");

const { OWNER, ADMIN } = require( "../helpers/constants" );

router.get("/", auth, allowedFor(OWNER, ADMIN), LanguageController.all);

router.get("/options", LanguageController.options);

router.post("/", auth, allowedFor(OWNER, ADMIN), LanguageController.create);

router.put("/:languageId", auth, allowedFor(OWNER, ADMIN), LanguageController.update);

router.delete("/:languageId", auth, allowedFor(OWNER, ADMIN), LanguageController.remove);

module.exports = router;
