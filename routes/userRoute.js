const express = require("express");
const {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
} = require("../controller/userController");
const router = express.Router();

router.route("/feed").get(getUsers);
router.route("/:id").delete(deleteUser).patch(updateUser);
router.route("/signup").post(createUser);

module.exports = router;
