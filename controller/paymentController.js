const razorpayInstance = require(".././utils/razorpay");
const PaymentModel = require("../models/paymentModel");
const { memberShipAmount } = require("../utils/constants");
//create order to razor pay
exports.createPayment = async function (req, res) {
  try {
    const loggedInUser = req.user;
    const { plan } = req.body;

    //Creating an order in RazorPay instance.
    const order = await razorpayInstance.orders.create({
      amount: memberShipAmount[plan] * 100,
      currency: "INR",
      receipt: "receipt#1",
      partial_payment: false,
      notes: {
        firstName: loggedInUser?.firstName,
        email: loggedInUser?.emailId,
        plan: plan,
      },
    });

    //Creating an payment based on order and stroing in DB
    const payment = await PaymentModel.create({
      orderId: order.id,
      userId: loggedInUser._id,
      status: order.status,
      amount: order.amount,
      currency: order.currency,
      reciept: order.receipt,
      notes: order?.notes,
    });
    res.status(201).json({
      status: "sucess",
      data: {
        ...payment.toJSON(),
        key_id: process.env.RAZORPAY_KEY,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};
