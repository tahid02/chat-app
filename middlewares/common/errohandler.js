const createError = require("http-errors"); // this package helps to create errors
// 404 not found error handler
function notFoundHandler(req, res, next) {
  next(createError(404, "your requested content was not found"));
}

// default error handler
// this is a common function which can send html or json as response
// by condition checking
function errorHandler(err, req, res, next) {
  // we can provide variables as the second parameters
  // in res.render() method. or we can assign them in res.locals object >>
  res.locals.error =
    process.env.NODE_ENV == "development" ? err : { message: err.message };

  res.status(err.status || 500); // sending status with others in response obj

  // we can send response both in html or json .. as user req
  // such as, if user hit the route as api.. we will give him json
  if (res.locals.html) {
    // if user would req for html then we will keep that html value in locals and show it . other wise we will json
    res.render("error", {
      title: "error page",
    });
  } else {
    // let , user wants json res . not html . then we will send json
    res.json(res.locals.error);
  }
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
