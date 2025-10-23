const express = require("express");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRoute");
const profileRouter = require("./routes/profileRouter");
const { userAuth } = require("./middleware/auth.middleware");
const RequestRouter = require("./routes/RequestRouter.js");
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/users",  userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/profile", profileRouter);
app.use("/api/v1/request", RequestRouter);


//ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
  console.log(err.stack);
  return res.status(500).json({
    message: err.message || err.message,
  });
});

module.exports = app;
