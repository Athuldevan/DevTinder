const express = require("express");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRoute");
const { userAuth } = require("./middleware/auth.middleware");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/users", userAuth, userRouter);
app.use("/api/v1/auth",  authRouter);

module.exports = app;
