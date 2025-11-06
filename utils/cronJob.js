const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const ConnectionRequest = require("../models/conectionRequestModal");
const { sendMail } = require("./send-email");

cron.schedule("28 19 * * *", async function () {
  console.log(`Daily task running...`);

  const yesterday = subDays(new Date(), 1);
  //    Calculating Start and time stamps
  const yesterdayStartTime = startOfDay(yesterday);
  const yesterdayEndTime = endOfDay(yesterday);

  const pendingRequests = await ConnectionRequest.find({
    status: "interested",
    createdAt: {
      $gte: yesterdayStartTime,
      $lte: yesterdayEndTime,
    },
  }).populate("fromUserId toUserId");

  // eXTRACTING EMAILS
  // Using set data structure to avoid duplicates
  const emailList = [
    ...new Set(pendingRequests.map((req) => req.toUserId.emailId)),
  ];

  for (const email of emailList) {
    await sendMail(
      email,
      "Pending Connection Requests",
      "You have pending connection requests from yesterday."
    );
  }

  console.log("Emails sent successfully!");
});
