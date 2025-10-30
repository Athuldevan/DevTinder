const express = require("express");
const profileController = require("../controller/profileController");
const { userAuth } = require("../middleware/auth.middleware");

const router = express.Router();
router.get("/", userAuth, profileController.getProfile);

module.exports = router;
