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

module.exports = { checkLogin };
