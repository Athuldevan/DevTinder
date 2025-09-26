const bcrypt = require("bcrypt");
const User = require("../models/userModal");
const jwt = require("jsonwebtoken");

async function signup(req, res) {
  try {
    const {
      firstName,
      lastName,
      password,
      gender,
      skills,
      emailId,
      about,
      age,
      photoUrl,
    } = req.body;

    //Encrypt or HASH  the user inputed password
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      age,
      emailId,
      skills,
      gender,
      photoUrl,
      about,
      password: passwordHash,
    });

    res.status(201).json({
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

async function login(req, res) {
  try {
    //password validation
    const { emailId, password } = req.body;
    if (!emailId || !password) {
      throw new Error("Email and password are required.");
    }
    // validateLogin(req);
    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("No such user found");
    }
    //comparing the Password in body and password in Database
    const isPasswordValid = await bcrypt.compare(password, user?.password);

    if (isPasswordValid) {
      const token = jwt.sign({ id: user._id }, "devTinder", {
        expiresIn: "1d",
      });
      res.cookie("userId", token, { httpOnly: true, secure: false }); //sending the cookie

      res.status(200).json({
        status: "success",
        data: "Succssfully Logged in.",
      });
    } else {
      res.status(404).json({
        status: "Failed",
        message: "Invalid Login credentials.",
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
}

//LOGOUT
async function logout(req, res) {
  try {
    res.cookie("userId", null, { expiresIn: new Date(Date.now()) });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ status: "success", message: "Logout failed" });
  }
}

module.exports = { signup, login, logout };
