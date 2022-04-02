// external imports
const express = require("express");

// internal imports
const {
  addConversation,
  getInbox,
  searchUser,
  getMessages,
} = require("../controller/inboxController");
const { checkLogin } = require("../middlewares/common/checkLogin");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");

const router = express.Router();

// inbox page
router.get("/", decorateHtmlResponse("Inbox"), checkLogin, getInbox);
// add conversation
router.post("/conversation", checkLogin, addConversation);
// search user for conversation
router.post("/search", checkLogin, searchUser);

// get messages of a conversation
router.get("/messages/:conversation_id", checkLogin, getMessages);

module.exports = router;
