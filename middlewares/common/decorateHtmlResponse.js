function decorateHtmlResponse(page_title) {
  return function (req, res, next) {
    // res.locals.html = true;
    // res.locals.title = `${page_title} - chat app`;
    next();
  };
}

module.exports = decorateHtmlResponse;
