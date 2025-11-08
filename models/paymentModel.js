const mongoose = require("mongoose");
const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: [true, "Missing order id "],
    },
    payment: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      required: [true, "Missing id in order"],
    },

    amount: {
      type: Number,
    },
    currency: {
      type: String,
      required: true,
    },

    reciept: {
      type: String,
    },
    notes: {
      firstName: String,
      email: String,
      plan: {
        type: String,
        required: [true, "Misssing plan field"],
      },
    },
  },
  { timestamps: true }
);

const PaymentModel = mongoose.model("paymentModel", paymentSchema);
module.exports = PaymentModel;
