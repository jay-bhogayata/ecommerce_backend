import { Router } from "express";
import {
  addCoupon,
  deleteCoupon,
  disableToken,
  getAllActiveCoupons,
  getAllCoupons,
} from "../controllers/coupon.controllers.js";

const router = Router();

router.post("/addCoupon", addCoupon);
router.post("/deleteCoupon/:id", deleteCoupon);
router.get("/getAllCoupons", getAllCoupons);
router.get("/getAllActiveCoupons", getAllActiveCoupons);
router.post("/disableToken/:id", disableToken);

export default router;
