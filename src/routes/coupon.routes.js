import { Router } from "express";
import {
  addCoupon,
  deleteCoupon,
  disableCoupon,
  getAllActiveCoupons,
  getAllCoupons,
} from "../controllers/coupon.controllers.js";

const router = Router();

router.post("/addCoupon", addCoupon);
router.delete("/deleteCoupon/:id", deleteCoupon);
router.get("/getAllCoupons", getAllCoupons);
router.get("/getAllActiveCoupons", getAllActiveCoupons);
router.put("/disableCoupon/:id", disableCoupon);

export default router;
