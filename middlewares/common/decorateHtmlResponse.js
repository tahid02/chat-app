function decorateHtmlResponse(page_title) {
  return function (req, res, next) {
    res.locals.html = true; // if we have to send html(like page) as response
    res.locals.title = `${page_title} - chat app`;
    // actually these three properties value will be provided in login process response
    res.locals.loggedInUser = {};
    res.locals.errors = {};
    res.locals.data = {};
    next();
  };
}

module.exports = decorateHtmlResponse;
