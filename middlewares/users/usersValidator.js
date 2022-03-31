const { validationResult, check } = require("express-validator");
const User = require("../../models/People");
const unlink = require("fs");

const addUserValidators = [
  // this is an array of middleware
  check("name") // this check() is a middleware
    // check this doc to see the optional validations like 'withMessage'....
    .isLength({ min: 1 }) //we can also validate length and others
    .withMessage("Name is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain anything other than alphabet")
    .trim(),
  // validate email
  check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .trim()
    // this is custom validator we can use in chain with check middleware
    .custom(async (value) => {
      try {
        // if this email is already in database.. no signup
        const user = await User.findOne({ email: value });
        if (user) {
          // this error can be cached in next middleware of this middleware
          throw createError("Email already is use!");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  // validate mobile
  check("mobile")
    .isMobilePhone("bn-BD", {
      strictMode: true,
    })
    .withMessage("Mobile number must be a valid Bangladeshi mobile number")
    .custom(async (value) => {
      try {
        const user = await User.findOne({ mobile: value });
        if (user) {
          throw createError("Mobile already is use!");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),

  // validate pass
  check("password")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol"
    ),
];

// If any error occurs while validating
const addUserValidationHandler = function (req, res, next) {
  const errors = validationResult(req);
  // mapped() will beautify the error msg
  const mappedErrors = errors.mapped();
  // output formate will be:
  // mappedErrors = {
  //     name:{
  //         msg:"name is required"
  //     },
  //     email:{
  //         msg:"invalid email address"
  //     }
  // }
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    // remove uploaded files
    if (req.files.length > 0) {
      // if the file exists
      const { filename } = req.files[0];
      unlink(
        path.join(__dirname, `/../public/uploads/avatars/${filename}`),
        (err) => {
          if (err) console.log(err);
        }
      );
    }

    // response the errors in json formate // we have sent html formate in loginValidator
    res.status(500).json({
      errors: mappedErrors,
    });
  }
};

module.exports = { addUserValidators, addUserValidationHandler };
