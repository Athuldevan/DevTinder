const User = require("../models/userModal");
const ConnectionRequest = require("../models/conectionRequestModal");
const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";
async function getUsers(req, res, next) {
  try {
    console.log(`fettching users..........`);
    const user = await User.find({});
    res.status(200).send({
      statu: "success",
      data: user,
    });
  } catch (err) {
    console.log("Something went wrong" + err);
    res.status(404).send({
      status: "failed",
      message: "Something went wrong",
    });
  }
}

// Get a single User
async function getUSer(req, res) {
  try {
    const id = req.params?.id;
    const user = await User.findById(id);
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
}

async function deleteUser(req, res) {
  try {
    const firstName = req.params.firstName;

    await User.deleteMany({ firstName: firstName });
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status.json({
      status: "failed",
      message: "Failed to deleted user",
    });
  }
}

//Update the user
async function updateUser(req, res) {
  try {
    const data = req.body;
    const id = req.params?.id;

    const user = await User.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    res.status(201).json({
      status: "message",
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      status: "failedd",
      message: error.message,
    });
  }
}

//Get all the conecction requests where in pending state means intersted
async function getAllConnectionRequests(req, res) {
  try {
    const loggedInUser = req.user;
    const allConnections = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);
    console.log(loggedInUser);
    console.log(allConnections);
    if (!allConnections || allConnections.length === 0)
      res.status(404).json({
        status: "failed",
        message: "You have zero connection requests",
      });

    res.status(200).json({
      status: "sucess",
      allConnections,
    });
  } catch (err) {
    res.status(400).json({
      status: "faileddd",
      message: err.message,
    });
  }
}

//get all connection recieved
const getAllConnections = async function (req, res) {
  try {
    const loggedInUser = req.user;

    const connections = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const data = connections.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      //else case
      return row.fromUserId;
    });
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

module.exports = {
  getUsers,
  getUSer,
  deleteUser,
  updateUser,
  getAllConnectionRequests,
  getAllConnections,
};
