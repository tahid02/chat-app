const express = require("express");
const {
  getUsers,
  addUser,
  removeUser,
} = require("../controller/usersController");
const { checkLogin, requireRole } = require("../middlewares/common/checkLogin");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const avatarUpload = require("../middlewares/users/avatarUpload");
const {
  addUserValidators,
  addUserValidationHandler,
} = require("../middlewares/users/usersValidator");
const router = express.Router();
// this will return a middleware (which adds some data in req object) , so , this middleware will work before getUsers middleware
router.get(
  "/",
  decorateHtmlResponse("Users"),
  checkLogin,
  requireRole(["admin"]),
  getUsers
);

// when user will submit data from login page .. these will happen synchronously
// avatarUpload = stores the file
// addUserValidators = validate sent form data by user
// addUserValidationHandler = if validation error > handel it (send err in response )
// now we are all set with the form inputs. they are validated
// now addUser = save user in db with handling err and send response
router.post(
  "/",
  checkLogin,
  requireRole(["admin"]), // array is used to add more roles
  avatarUpload,
  addUserValidators,
  addUserValidationHandler,
  addUser
);
router.delete("/:id", removeUser);
module.exports = router;
