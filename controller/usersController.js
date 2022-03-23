function getUsers(req, res, next) {
  res.locals.title = "Users"; // this property was supposed to be written in "decorateHtmlResponse" file

  res.render("users");
}

module.exports = getUsers;
