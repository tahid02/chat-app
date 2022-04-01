const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const User = require("../models/People");
const bcrypt = require("bcrypt");
// it sends login page(get login page)
function getLogin(req, res, next) {
  // res.locals.title = "login";// middleware "decorateHtmlResponse" was written to add this property dynamically
  res.render("index");
}
async function login(req, res, next) {
  try {
    const user = await User.findOne({
      $or: [{ email: req.body.username }, { mobile: req.body.mobile }],
    });
    // console.log({ user });
    // now check password
    if (user && user._id) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (isValidPassword) {
        // now user is valid. will give zir token now
        const userObject = {
          username: user.name,
          mobile: user.mobile,
          email: user.email,
          role: user?.role,
        };
        const token = jwt.sign(userObject, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRY,
        });
        console.log({ token });
        // adding cookie property in res obj
        await res.cookie(process.env.COOKIE_NAME, token, {
          maxAge: process.env.JWT_EXPIRY,
          httpOnly: true,
          signed: true, // cookie will be encrypted
        });

        // adding property in locals of res obj
        res.locals.loggedInUser = userObject;
        await res.render("inbox"); //  if successfully logged in.. >> inbox page
      } else {
        // throw createError("validation token cookie");
        throw createError("log in failed ! please try again ");
      }
    } else {
      // throw createError("user not found");
      throw createError("log in failed ! please try again ");
    }
  } catch (error) {
    res.render("index", {
      data: {
        // will use this data to autofill the username input field
        username: req.body.username,
      },
      errors: {
        common: {
          msg: error.message,
        },
      },
    });
  }
}

async function logout(req, res) {
  res.clearCookie(process.env.COOKIE_NAME);
  res.send("logged out");
}
module.exports = {
  getLogin,
  login,
  logout,
};
