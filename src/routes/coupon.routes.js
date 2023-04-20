import { Router } from "express";
import {
  addCoupon,
  deleteCoupon,
  disableCoupon,
  getAllActiveCoupons,
  getAllCoupons,
} from "../controllers/coupon.controllers.js";
import { authorize, isLoggedIn } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/addCoupon", isLoggedIn, authorize("ADMIN"), addCoupon);
router.post("/deleteCoupon/:id", isLoggedIn, authorize("ADMIN"), deleteCoupon);
router.get("/getAllCoupons", isLoggedIn, authorize("ADMIN"), getAllCoupons);
router.get(
  "/getAllActiveCoupons",
  isLoggedIn,
  authorize("ADMIN"),
  getAllActiveCoupons
);
router.post(
  "/disableCoupon/:id",
  isLoggedIn,
  authorize("ADMIN"),
  disableCoupon
);

export default router;
