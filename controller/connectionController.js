const ConnectionRequestModal = require("../models/conectionRequestModal");
const User = require("../models/userModal");

exports.connectionRequest = async (req, res) => {
  try {
    const toUserId = req.params.toUserId;
    const fromUserId = req.user?._id;
    const status = req.params.status;
    connectionData = await ConnectionRequestModal.create({
      toUserId,
      fromUserId,
      status,
    });

    //checking for the allowed user
    const allowesStatus = ["interested", "ignored"];
    if (!allowesStatus.includes(status)) {
      return res.status(400).json({
        status: "failed",
        message: "invalid status type",
      });
    }


    //Checking if the to connection is already is already exists
    const isToUserIdExists = await User.findById(toUserId);
    if (!isToUserIdExists) {
      throw new Error("No such user exists");
    }

    //checking if the connection request is already exists
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
    // If everything is Okay
    res.status(200).json({
      status: "success",
      data: connectionData,
    });
  } catch (error) {
    console.log(error.stack);
    res.status(500).json({
      status: "failed ",
      message: error.message,
    });
  }
};
