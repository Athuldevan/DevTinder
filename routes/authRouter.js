const express = require("express");
const router = express.Router();
const { signup, login, getProfile } = require("../controller/authController");
const {userAuth} = require("../middleware/auth.middleware");

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/profile").get(userAuth, getProfile);

module.exports = router;
