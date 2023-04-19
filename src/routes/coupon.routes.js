import { Router } from "express";
import { addCoupon, deleteCoupon } from "../controllers/coupon.controllers.js";

const router = Router();

router.post("/addCoupon", addCoupon);
router.post("/deleteCoupon/:id", deleteCoupon);

export default router;
