import Collection from "../models/collection.schema.js";
import CustomError from "../utils/CustomError";
import asyncHandler from "../utils/asyncHandler.js";

export const createCollection = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    throw new CustomError("Collection name is required", 400);
  }

  const collection = await Collection.create({
    name,
  });

  res.status(200).json({
    success: true,
    message: "collection created successfully",
    collection,
  });
});

export const updateCollection = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const { id: collectionId } = req.params;

  if (!name) {
    throw new CustomError("name is required", 400);
  }

  let updateCollection = await Collection.findByIdAndUpdate(
    collectionId,
    {
      name,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updateCollection) {
    throw new CustomError("collection not found", 400);
  }

  res.status(200).json({
    success: true,
    message: "collection updated successfully",
    updateCollection,
  });
});
