const router = require("express").Router();

const { auth } = require("../middlewares/auth");

const ChatController = require("../Controllers/ChatController");

router.get("/contacts", auth, ChatController.contacts);

router.post("/new-message", auth, ChatController.newMessage);

router.get("/messages/:recipient", auth, ChatController.messages);

module.exports = router;
