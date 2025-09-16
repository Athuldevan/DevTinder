const mongoose = require("mongoose");

const DB =
  "mongodb+srv://devtinder:907j8pHScr5K75z1@devtinder.4nsa5qg.mongodb.net/DevTinder?retryWrites=true&w=majority";

async function connectDb() {
  try {
    await mongoose.connect(DB);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to connect Databse");
  }
}
module.exports = connectDb


