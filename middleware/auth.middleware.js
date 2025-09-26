const jwt = require("jsonwebtoken");
const User = require("../models/userModal");
const { stack } = require("../app");

async function userAuth(req, res, next) {
  try {
    const { userId } = req.cookies;
    if (!userId) throw new Error("user not found.Please login first");
    const decodedToken = jwt.verify(userId, "devTinder");
    if (!decodedToken) throw new Error("Invalid Token");
    const { id } = decodedToken;
    const user = await User.findById(id);
    if (!user) throw new Error("No user found.Please Login first");
    req.user = user;
    next();
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "Please login first",
    });
  }
}

module.exports = { userAuth };
