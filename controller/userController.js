const User = require("../models/userModal");
const ConnectionRequest = require("../models/conectionRequestModal");
const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

async function getUsers(req, res, next) {
  try {
    const user = await User.find({});
    res.status(200).send({
      statu: "success",
      data: user,
    });
  } catch (err) {
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

// Get all User  feed
async function getFeed(req, res) {
  try {
    const loggedInUser = req.user;
    const pageNumber = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skipNumber = (pageNumber - 1) * limit;

    // Get all connection requests involving the logged-in user (sent, received, accepted)
    const allConnections = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUser._id },
        { toUserId: loggedInUser._id },
      ],
    }).select("fromUserId toUserId");

    // Build set of user IDs to hide
    const hideUserFromFeed = new Set();
    allConnections.forEach((conn) => {
      hideUserFromFeed.add(conn.fromUserId.toString());
      hideUserFromFeed.add(conn.toUserId.toString());
    });
    hideUserFromFeed.add(loggedInUser._id.toString()); // hide self

    // Get feed suggestions
    const userFeedSuggestion = await User.find({
      _id: { $nin: Array.from(hideUserFromFeed) },
    })
      .select(USER_SAFE_DATA)
      .skip(skipNumber)
      .limit(limit);

    if (userFeedSuggestion.length === 0) {
      return res.status(200).json({
        status: "success",
        message: "No more users",
        userFeedSuggestion: [],
      });
    }

    res.status(200).json({
      status: "success",
      userFeedSuggestion,
    });
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
}


module.exports = {
  getUsers,
  getUSer,
  deleteUser,
  updateUser,
  getAllConnectionRequests,
  getAllConnections,
  getFeed,
};
