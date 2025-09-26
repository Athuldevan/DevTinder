const express = require("express");
const router = express.Router();
const { signup, login, logout } = require("../controller/authController");
const { userAuth } = require("../middleware/auth.middleware");
const profileController = require("../controller/profileController");

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").post(logout);

router.route("/profile").get(userAuth, profileController.getProfile);

module.exports = router;
