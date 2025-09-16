function isUserAuthenticated(req, res, next) {
  const token = "us6er";
  if (token === "user") {
    next();
  } else {
    return res.send("Unauthourized user request.Please go and login first.");
  }
}

module.exports = isUserAuthenticated;
