const express = require("express");
const { getLogin, login, logout } = require("../controller/loginController");
const { redirectLoggedIn } = require("../middlewares/common/checkLogin");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const {
  doLoginValidationHandler,
  doLoginValidators,
} = require("../middlewares/login/loginValidator");
const router = express.Router();

const page_title = "login";

// get the login page when user goes to the login page router
router.get("/", decorateHtmlResponse(page_title), redirectLoggedIn, getLogin);

//login process
router.post(
  "/",
  decorateHtmlResponse(page_title), //as we are sending html template as response so, title also needed here
  doLoginValidators,
  doLoginValidationHandler,
  login
);

router.delete("/", logout);
module.exports = router;
