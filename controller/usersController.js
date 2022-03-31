const path = require("path");
const { unlink } = require("fs");
const bcrypt = require("bcrypt");
const User = require("../models/People");

// get the users from DB
async function getUsers(req, res, next) {
  // res.locals.title = "Users"; // middleware "decorateHtmlResponse" was written to add this property dynamically

  try {
    const users = await User.find();
    await res.render("users", {
      // this will render the users.ejs file from views folder
      users: users, // sends users var in the users.ejs file.. or use users.locals
    });
  } catch (error) {
    next(error);
  }
}

// add user
async function addUser(req, res, next) {
  let newUser;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  if (req.files && req.files.length > 0) {
    // create the user obj
    newUser = await new User({
      ...req.body,
      avatar: req.files[0].filename,
      password: hashedPassword,
    });
  } else {
    newUser = await new User({
      ...req.body,
      password: hashedPassword,
    });
  }

  try {
    // now save the user in database
    const result = await newUser.save();
    res.status(200).json({
      message: "User was added successfully!",
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        // this is a common error. so we put it in a common property
        common: {
          msg: "Unknown error occured!",
        },
      },
    });
  }
}

// delete user
async function removeUser(req, res, next) {
  try {
    // we have to delete the avatar too(as it is not in DB). so  , we used findByIdAndDelete to get the deleted item and use this info to delete the avatar
    const user = await User.findByIdAndDelete({
      _id: req.params.id,
    });
    if (user.avatar) {
      await unlink(
        path.join(__dirname, `/../public/uploads/avatars/${filename}`),
        (err) => {
          if (err) console.log(err);
        }
      );
    }
    res.status(200).json({
      message: "user has been removed successfully",
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Could not delete the user",
        },
      },
    });
  }
}

module.exports = { addUser, getUsers, removeUser };
