// external imports
const express = require("express");

// internal imports
const {
  addConversation,
  getInbox,
  searchUser,
  getMessages,
  sendMessage,
} = require("../controller/inboxController");
const { checkLogin } = require("../middlewares/common/checkLogin");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const attachmentUpload = require("../middlewares/inbox/attachmentUpload");

const router = express.Router();

// inbox page
router.get("/", decorateHtmlResponse("Inbox"), checkLogin, getInbox);
// add conversation
router.post("/conversation", checkLogin, addConversation);
// search user for conversation
router.post("/search", checkLogin, searchUser);

// get messages of a conversation
router.get("/messages/:conversation_id", checkLogin, getMessages);
// send message
router.post("/message", checkLogin, attachmentUpload, sendMessage);

module.exports = router;
