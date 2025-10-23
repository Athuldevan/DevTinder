const ConnectionRequestModal = require("../models/conectionRequestModal");
const User = require("../models/userModal");

exports.connectionRequest = async (req, res) => {
  try {
    const toUserId = req.params.toUserId;
    const fromUserId = req.user?._id;
    const status = req.params.status;
    // Validate status BEFORE saving
    const allowedStatus = ["interested", "ignored"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid status type",
      });
    }
    const isToUserIdExists = await User.findById(toUserId);
    if (!isToUserIdExists) {
      return res.status(404).json({
        status: "faile",
        message: "No Such user exists",
      });
    }

    // Check if connection already exists
    const isConnectionAlreadyExists = await ConnectionRequestModal.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });
    if (isConnectionAlreadyExists) {
      return res.status(400).json({
        status: "failed",
        message: "This connection already exists",
      });
    }
    // Save new connection request
    const connectionData = await ConnectionRequestModal.create({
      toUserId,
      fromUserId,
      status,
    });
    res.status(200).json({
      status: "success",
      data: connectionData,
    });
  } catch (error) {
    console.error(error.stack);
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

// review connection request
exports.reviewConnectionRequests = async function (req, res) {
  try {
    const loggedInUser = req.user;
    const { status, requestedId } = req.params;
    console.log(requestedId)

    const allowedStatus = ["accepted", "rejected"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ messaage: "Status not allowed!" });
    }

    const connectionRequest = await ConnectionRequestModal.findOne({
      _id: requestedId,
      toUserId: loggedInUser._id,
      status :"interested"
    }).populate("fromUserId");
    if (!connectionRequest) {
      return res.status(404).json({ message: "Connection request not found" });
    }

    connectionRequest.status = status;

    const data = await connectionRequest.save(); //saving the connection request in the database

    res.json({ message: "Connection request " + status, data });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};
