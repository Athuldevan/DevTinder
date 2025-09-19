const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "A user must have a name"],
      maxLength: 20,
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
    },

    password: {
      type: String,
      unique: true,
      required: [true, "A user must have a Password."],
      min: 6,
      max: 12,
      trim: true,
    },
    gender: {
      type: String,
      //validator function that return true or false.
      validate: {
        validator: (gender) => ["male", "female", "others"].includes(gender),
      },
      message: (props) => `${props.value} is not a valid phone numbere`, //error message when validation failes
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
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
