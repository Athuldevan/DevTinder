const express = require("express");
const router = express.Router();
const connectionController = require("../controller/connectionController");

 const { userAuth } = require('../middleware/auth.middleware');
 
 router.route("/:status/:toUserId").post(userAuth, connectionController.connectionRequest);
module.exports = router;
