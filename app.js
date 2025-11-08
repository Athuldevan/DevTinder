const express = require("express");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRoute");
const profileRouter = require("./routes/profileRouter");
const RequestRouter = require("./routes/RequestRouter.js");
const paymentRouṭer = require("./routes/paymentRouter");
const app = express();
const cors = require("cors");
app.use(
  cors({
    origin: "http://127.0.0.1:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Cron job
require("./utils/cronJob.js");
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/profile", profileRouter);
app.use("/api/v1/request", RequestRouter);
app.use("/api/v1/payment", paymentRouṭer);



//ERROR HANDLING MIDDLEWARE....
app.use((err, req, res, next) => {
  console.log(err.stack);
  return res.status(404).json({
    message: "URL NOT FOUND.",
  });
});

module.exports = app;
