const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const User = require("../models/People");

// it sends login page(get login page)
function getLogin(req, res, next) {
  // res.locals.title = "login";// middleware "decorateHtmlResponse" was written to add this property dynamically
  res.render("index");
}
async function login(req, res, res) {
  try {
    const user = await User.find({
      $or: [{ email: req.body.username }, { mobile: req.body.mobile }],
    });
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
        await res.render("inbox");
      } else {
        throw createError("login failed! please try again");
      }
    } else {
      throw createError("login failed! please try again");
    }
  } catch (error) {
    res.render("index", {
      data: {
        // will use this data to autofill the username input field
        username: req.body.username,
      },
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
}
module.exports = {
  getLogin,
  login,
};
