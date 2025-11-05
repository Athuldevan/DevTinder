const mongoose = require("mongoose");
require("dotenv").config();
const DB_URL = process.env.DB_URL;
if (!DB_URL) console.log("database url is missing in the .emv file ");
async function connectDb() {
  try {
    await mongoose.connect(DB_URL);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to connect Databse");
  }
}
module.exports = connectDb;
