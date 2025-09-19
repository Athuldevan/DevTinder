const User = require("../models/userModal");

async function getUsers(req, res, next) {
  try {
    const user = await User.find();
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

async function createUser(req, res) {
  try {
    const user = req.body;
    await User.create(user);

    res.status(201).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: "Failed to create a user" + err,
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

async function updateUser(req, res) {
  try {
    const id = req.params.id;
    const data = req.body;
    console.log(data);

    const user = await User.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    console.log(data);
    res.status(201).json({
      status: "message",
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: error.message,
    });
  }
}

module.exports = { getUsers, createUser, deleteUser, updateUser };
