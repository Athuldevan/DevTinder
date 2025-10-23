const express = require("express");
const {
  getUsers,
  deleteUser,
  updateUser,
  getUSer,
  getAllConnectionRequests,
  getAllConnections,
} = require("../controller/userController");
const { userAuth } = require("../middleware/auth.middleware");
const router = express.Router();

router.route("/feed").get(userAuth, getUsers);
router.route("/requests/recieved").get(userAuth, getAllConnectionRequests);
router.route("/connections").get(userAuth, getAllConnections);
router
  .route("/:id")
  .get(userAuth, getUSer)
  .delete(userAuth, deleteUser)
  .patch(userAuth, updateUser);

module.exports = router;
