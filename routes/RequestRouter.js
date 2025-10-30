const express = require("express");
const router = express.Router();
const connectionController = require("../controller/connectionController");

const { userAuth } = require("../middleware/auth.middleware");
console.log("router hit");
router
  .route("/send/:status/:toUserId")
  .post(userAuth, connectionController.connectionRequest);

router
  .route("/review/:status/:requestedId")
  .post(userAuth, connectionController.reviewConnectionRequests);
module.exports = router;
////api/v1/review/rejected/68f9ce270faa7f2d3fbb5ee6