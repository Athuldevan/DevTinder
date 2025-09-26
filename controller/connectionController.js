const ConnectionRequestModal = require("../models/conectionRequestModal");
const User = require("../models/userModal");

exports.connectionRequest = async (req, res) => {
  try {
    console.log("Request hit");

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

    // Check if target user exists
    const isToUserIdExists = await User.findById(toUserId);
    if (!isToUserIdExists) {
      throw new Error("No such user exists");
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

exports.reviewConnectionRequests = async function (req, res) {
  try {
    const loggedInUser = req.user;
    const { status, requestId } = req.params;

    const allowedStatus = ["accepted", "rejected"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ messaage: "Status not allowed!" });
    }

    const connectionRequest = await ConnectionRequestModal.findOne({
      _id: requestId,
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", [firstName, lastName]);
    if (!connectionRequest) {
      return res.status(404).json({ message: "Connection request not found" });
    }

    connectionRequest.status = status;

    const data = await ConnectionRequestModal.save();

    res.json({ message: "Connection request " + status, data });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};
