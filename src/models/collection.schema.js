import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a collection name"],
      unique: [true, "collection name must be unique"],
      trim: true,
      maxLength: [120, "Collection should not be more then 120 chars."],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Collection", collectionSchema);
