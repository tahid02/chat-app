function getInbox(req, res, next) {
  // res.locals.title = "Inbox"; // middleware "decorateHtmlResponse" was written to add this property dynamically
  res.render("inbox");
}

module.exports = getInbox;
