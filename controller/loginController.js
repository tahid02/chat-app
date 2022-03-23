// it sends login page(get login page)
function getLogin(req, res, next) {
  res.locals.title = "login"; // this property was supposed to be written in "decorateHtmlResponse" file
  res.render("index");
}

module.exports = {
  getLogin,
};
