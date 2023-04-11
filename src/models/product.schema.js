import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please provide a product name"],
      trim: true,
      maxLength: [120, "product name must be more then 120 char. long"],
    },
    price: {
      type: Number,
      required: [true, "please provide a product price"],
      maxLength: [5, "product price should not be more then 5"],
    },
    description: {
      type: String,
    },
    photos: [
      {
        secure_url: {
          type: String,
          required: true,
        },
      },
    ],
    stock: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    collectionID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
