function isAdminAuthenticated(req, res, next) {
  const token = "123";
  if (token === "123") {
    next();
  } else {
    res.status(402).send("Unauthorized request..Please Go and Login first");
  }
}

module.exports = isAdminAuthenticated;
