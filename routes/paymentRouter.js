const express = require("express");
const { userAuth } = require("../middleware/auth.middleware");
const router = express.Router();
const paymentController = require("../controller/paymentController");
const Payment = require("../models/paymentModel");
const {
  validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils");
const User = require("../models/userModal");

router.post("/create", userAuth, paymentController.createPayment);
router.post("/webhook", async (req, res) => {
  try {
    console.log("web hook hit");
    const webhookSignature = req.get("X-Razorpay-Signature"); // Its is an razor pay header that razorpay givess

    console.log("webhooko sigature", webhookSignature);

    //Validating web hook signature
    const iswebhookValid = validateWebhookSignature(
      JSON.stringify(req.body),
      webhookSignature,
      process.env.RAZORPAY_WEBHOOK_SECRET
    );

    if (!iswebhookValid) {
      console.log("web hook not valid");
      return res.status(500).json({ message: "webhook is not valid.." });
    }

    //If web hook is valid...
    const paymentDetails = req.body.payload.payment.entity;
    console.log("Payment details");
    // update payment uis db
    // update the user as PREMIUM
    // REturn sucess RSPONSE TO RAZORPAY

    const payment = await Payment.findOne({
      orderId: paymentDetails.order_id,
    });
    console.log(payment);
    if (!payment) {
      console.log("Payment not found for order:", paymentDetails.order_id);
      payment.status = paymentDetails?.status;
      await payment.save();

      return res.status(404).json({ message: "Payment not found" });
    }

    const user = await User.findOne({ _id: payment.userId });
    console.log("user", user);
    if (!user) {
      console.log("User not found for ID:", payment.userId);
      return res.status(404).json({ message: "User not found" });
    }
    user.isPremium = true;
    await user.save();

    return res.status(200).json({
      status: "sucess",
      message: "Webhook recieved sucessfully..",
    });
  } catch (err) {
    console.log("error in catch block,", err.message)
    return res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
});
module.exports = router;
