import Product from "../models/product.schema.js";
import formidable from "formidable";
import { s3FileUpload, s3deleteFile } from "../services/imageUpload.js";
import { Mongoose } from "mongoose";
import asyncHandler from "../utils/asyncHandler.js";
import CustomError from "../utils/CustomError.js";
import config from "../config/index.js";
import fs from "node:fs";

export const addProduct = asyncHandler(async (req, res) => {
  const form = formidable({ multiples: true, keepExtensions: true });

  form.parse(req, async function (err, fields, files) {
    if (err) {
      throw new CustomError(err.message || "something went wrong", 500);
    }
    let productId = new Mongoose.Types.ObjectId().toHexString();
    console.log(field, files);

    if (
      !fields.name ||
      !fields.price ||
      !fields.description ||
      !fields.collectionId
    ) {
      throw new CustomError("all fields are required", 500);
    }

    let imageArrayRes = Promise.all(
      Object.keys(files).map(async (file, index) => {
        const element = file[filekey];
        console.log(element);
        const data = fs.readFileSync(element.filepath);

        const upload = await s3FileUpload({
          bucketName: config.S3_BUCKET_NAME,
          key: `product/${productId}/photo_${index + 1}.png`,
          body: data,
          contentType: element.mimetype,
        });
        console.log(upload);
        return {
          secure_url: upload.Location,
        };
      })
    );
    let imgArray = await imageArrayRes;

    const product = await Product.create({
      _id: productId,
      photos: imgArray,
      ...fields,
    });
    if (!product) {
      throw new CustomError("Product is failed to be created in DB", 400);
    }
    res.status(200).json({
      success: true,
      product,
    });
  });
});

export const getAllProduct = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  if (!products) {
    throw new CustomError("no product found", 400);
  }
  res.status(200).json({
    success: true,
    products,
  });
});

export const getProductById = asyncHandler(async (req, res) => {
  const { id: productId } = req.params;

  const product = Product.findById(productId);

  if (!product) {
    throw new CustomError("no product found", 404);
  }
  res.status(200).json({
    success: true,
    product,
  });
});

export const getProductByCollectionId = asyncHandler(async (req, res) => {
  const { id: collectionId } = req.params;
  const products = Product.find({ collectionId });
  if (!products) {
    throw new CustomError("no products found in this collection", 404);
  }
  if (!product) {
    throw new CustomError("no product found", 404);
  }
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findById(productId);
  if (!product) {
    throw new CustomError("No product found", 404);
  }

  const deletePhotos = Promise.all(
    product.photos.map(async (elem, index) => {
      await s3deleteFile({
        bucketName: config.S3_BUCKET_NAME,
        key: `product/${productId}/photo_${index + 1}.png`,
      });
    })
  );

  await deletePhotos;

  await Product.remove();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});
