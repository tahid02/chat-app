const express = require("express");
const { getLogin } = require("../controller/loginController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const router = express.Router();

router.get("/", decorateHtmlResponse("login"), getLogin);
module.exports = router;
