const express = require("express");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRoute");
const profileRouter = require("./routes/profileRouter");
const { userAuth } = require("./middleware/auth.middleware");
const connectionRequestRouter = require("./routes/RequestRouter.js");
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/users", userAuth, userRouter);

app.use("/api/v1/auth", authRouter);

app.use("/api/v1/profile", profileRouter);
app.use("/api/v1/request/send", connectionRequestRouter);

module.exports = app;
