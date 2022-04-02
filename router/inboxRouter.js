// external imports
const express = require("express");

// internal imports
const { addConversation, getInbox } = require("../controller/inboxController");
const { checkLogin } = require("../middlewares/common/checkLogin");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");

const router = express.Router();

// inbox page
router.get("/", decorateHtmlResponse("Inbox"), checkLogin, getInbox);
// add conversation
router.post("/conversation", checkLogin, addConversation);
// search user for conversation
router.post("/search", checkLogin);

module.exports = router;
