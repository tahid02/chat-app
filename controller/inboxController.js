function getInbox(req, res, next) {
  res.locals.title = "Inbox"; // this property was supposed to be written in "decorateHtmlResponse" file
  res.render("inbox");
}

module.exports = getInbox;
