const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required : true,
      ref : 'User'
    },

    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: ["interested", "ignored", "accepted", "rejected"],
      message: `{VALUE} is not supported for status type`,
    },
  },
  { timestamps: true }
);

//creating a model
const ConnectionRequest = mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);

//Creating a index for connection request schema.
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

//Creating a pre save function to cheack a validation
connectionRequestSchema.pre("save", function (next) {
  if (this.fromUserId.equals(this.toUserId)) {
    return resizeBy.status(500).json({
      status: "failed",
      message: "You cant send connection to yourself",
    });
  }
  next();
});

module.exports = ConnectionRequest;
