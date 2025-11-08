  const bcrypt = require("bcrypt");
  const User = require("../models/userModal");
  const jwt = require("jsonwebtoken");
  const { sendMail } = require("../utils/send-email");
  // const { sendEmail } = require("../utils/send-mail");
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
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res.cookie("userId", token, { httpOnly: true, secure: false }); //sending the cookie
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
      const { emailId, password } = req.body;
      if (!emailId || !password) {
        return res.status(400).json({
          status: "failed",
          message: "Please provide emailId and password",
        });
      }

      const user = await User.findOne({ emailId: emailId });

      if (!user) {
        return res.status(404).json({
          status: "Failed",
          message: "User not found. Please signup first.",
        });
      }

      // const isPasswordValid = await bcrypt.compare(password, user.password);
      const isPasswordValid = await user.isPassWordCorrect(password);

      if (isPasswordValid) {
        const token = jwt.sign({ id: user._id }, "devTinder", {
          expiresIn: "1d",
        });
        res.cookie("userId", token, { httpOnly: true, secure: false }); //sending the cookie
        //Sending email;

       
        // const email = await sendEmail(
        //   emailId,
        //   "athuldevan90@gmail.com",
        //   "Sucessfully logged in the acccount",
        //   "Devtinder Login Sucessfully Compleeted .Happy connection and networking"
        // );
        await sendMail(
          emailId,
          "LOgin",
          "Sucessfullt loogged in  ..connect with developers"
        );
        res.status(200).json({
          status: "success",
          data: user,
        });
      } else {
        res.status(404).json({
          status: "Failed",
          message: "Invalid Login credentials.",
        });
      }
    } catch (err) {
      console.log(err.message);
      res.status(404).json({
        status: "failed",
        message: err,
      });
    }
  }

  //  LOGOUT
  async function logout(req, res) {
    try {
      res.cookie("userId", null, { expiresIn: new Date(Date.now()) });
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      res.status(500).json({
        status: "failed",
        message: "Someting went wrong while Looging ouyt .Try agin!!",
      });
    }
  }

  module.exports = { signup, login, logout };
