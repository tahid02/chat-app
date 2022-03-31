const express = require("express");
const { getLogin, login } = require("../controller/loginController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const router = express.Router();

router.get("/", decorateHtmlResponse("login"), getLogin);
router.post("/", login);
module.exports = router;
