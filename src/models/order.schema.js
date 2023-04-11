import mongoose from "mongoose";
import Status from "../utils/Status";
const orderSchema = new mongoose.Schema(
  {
    product: {
      type: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
          },
        },
      ],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      require: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    coupon: String,
    transactionId: String,
    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.ORDERED,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
