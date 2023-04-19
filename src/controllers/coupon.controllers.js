import Coupon from "../models/coupon.schema.js";
import asyncHandler from "../utils/asyncHandler.js";
import CustomError from "../utils/CustomError.js";

export const addCoupon = asyncHandler(async (req, res) => {
  const { code, discount } = req.body;
  if (!code || !discount) {
    throw new CustomError("coupon code and discount both are required", 400);
  }
  const isExists = await Coupon.findOne({ code });
  console.log(isExists);
  if (isExists) {
    throw new CustomError("coupon with same name is already exists", 400);
  }
  const coupon = await Coupon.create({
    code,
    discount,
  });

  res.status(200).json({
    success: "true",
    message: "coupon created successfully.",
    coupon,
  });
});

export const deleteCoupon = asyncHandler(async (req, res) => {
  const { id: couponId } = req.params;
  if (!couponId) {
    throw new CustomError("coupon id is required to delete the token", 400);
  }
  const isCodeExists = await Coupon.findById(couponId);
  if (!isCodeExists) {
    throw new CustomError("coupon code does not exits", 404);
  }
  await Coupon.findByIdAndDelete(couponId);
  res.status(200).json({
    success: true,
    message: "coupon deleted successfully.",
  });
});
