// it sends login page(get login page)
function getLogin(req, res, next) {
  // res.locals.title = "login";// middleware "decorateHtmlResponse" was written to add this property dynamically
  res.render("index");
}

module.exports = {
  getLogin,
};
