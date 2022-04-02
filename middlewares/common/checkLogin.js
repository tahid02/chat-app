const checkLogin = async (req, res, next) => {
  let cookies =
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
  // here, in response , we will handle both html and json as requested.
  // if user req for html, we will send html (by using decorateHtmlResponse middleware as it adds locals.html = true in res obj  and then  checking it here in condition)
  // if the res will should be json, we will send json (like errors>common obj)
  if (cookies) {
    try {
      let token = await cookies[process.env.COOKIE_NAME];
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; /// contains the users data from jwt token()
      // pass user info to response locals// if we have to send html as response(userObject>> created in login process)
      if (res.locals.html) {
        res.locals.loggedInUser = decoded;
      }
      next();
    } catch (error) {
      if (res.locals.html) {
        res.redirect("/");
      } else {
        res.status(500).json({
          errors: {
            common: {
              msg: "Authentication failure!",
            },
          },
        });
      }
    }
  } else {
    if (res.locals.html) {
      res.redirect("/");
    } else {
      res.status(401).json({
        error: "Authentication failure",
      });
    }
  }
};

const redirectLoggedIn = function (req, res, next) {
  let cookies = // this cookie contain jwt token . so , if cookie exist . user is valid
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
  console.log({ cookies });
  if (!cookies) {
    next();
  } else {
    res.redirect("/inbox"); // redirect to inbox page
  }
};

// guard to protect routes that need role based authorization // like if we want to authorize "user" page only for specific role(s)(admin)
function requireRole(role) {
  // provide role(s) that u want to authorize
  return function (req, res, next) {
    if (req.user.role && role.includes(req.user.role)) {
      // we got this req.user.role <<< cookie in previous middleware "checkLogin" << this cookie was set in login process(in jwt)
      next();
    } else {
      if (res.locals.html) {
        next(createError(401, "You are not authorized to access this page!"));
      } else {
        res.status(401).json({
          errors: {
            common: {
              msg: "You are not authorized!",
            },
          },
        });
      }
    }
  };
}
module.exports = { checkLogin, redirectLoggedIn, requireRole };
