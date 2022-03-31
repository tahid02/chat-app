const express = require("express");
const { getUsers, addUser } = require("../controller/usersController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const avatarUpload = require("../middlewares/users/avatarUpload");
const {
  addUserValidators,
  addUserValidationHandler,
} = require("../middlewares/users/usersValidator");
const router = express.Router();
// this will return a middleware (which adds some data in req object) , so , this middleware will work before getUsers middleware
router.get("/", decorateHtmlResponse("Users"), getUsers);

// when user will submit data from login page .. these will happen synchronously
// avatarUpload = stores the file
// addUserValidators = validate sent form data by user
// addUserValidationHandler = if validation error > hadnle it (send err in response )
// now we are all set with the form inputs. they are validated
// now addUser = save user in db with handling err and send response
router.post(
  "/",
  avatarUpload,
  addUserValidators,
  addUserValidationHandler,
  addUser
);
module.exports = router;
