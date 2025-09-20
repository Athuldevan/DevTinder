const express = require("express");
const {
  getUsers,
  deleteUser,
  updateUser,
  getUSer,
} = require("../controller/userController");
const router = express.Router();

router.route("/feed").get(getUsers);
router.route("/:id").get(getUSer).delete(deleteUser).patch(updateUser);

module.exports = router;
