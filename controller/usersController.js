const bcrypt = require("bcrypt");
const User = require("../models/People");

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

module.exports = { getUsers, addUser };
