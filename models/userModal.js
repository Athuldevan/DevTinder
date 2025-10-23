"use strict";
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "A user must have a name"],
      maxLength: 20,
      select: true,
    },
    lastName: {
      type: String,
      required: [true, "A user must have a last Name"],
    },
    age: {
      type: Number,
    },

    emailId: {
      type: String,
      required: [true, "A user must have a user"],
      lowerCase: true,
      trim: true,
      unique: true,
      validate: {
        validator: (emailId) => validator.isEmail(emailId),
        message: "Please enter a valid Email.",
      },
    },

    password: {
      type: String,
      unique: true,
      required: [true, "A user must have a Password."],
      min: 6,
      max: 12,
      trim: true,
      validate: {
        validator: (password) => validator.isStrongPassword(password),
        message: "Please Enter a Strong password",
      },
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "others"],
        message: "{VALUE} is not supported",
      },
    },

    about: {
      type: String,
      default: "Hey there.",
    },

    skills: {
      type: [String],
    },

    photoUrl: {
      type: String,
      default:
        "https://media.istockphoto.com/id/1220827245/vector/anonymous-gender-neutral-face-avatar-incognito-head-silhouette.jpg?s=612x612&w=0&k=20&c=GMdiPt_h8exnrAQnNo7dIKjwZyYqjH4lRQqV8AOx4QU=",

      validate: {
        validator: (url) => validator.isURL(url),
        message: "please enter a valid url.",
      },
    },
  },
  { timestamps: true }
);

userSchema.methods.isPassWordCorrect = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
