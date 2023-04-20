import { Router } from "express";
import authRoutes from "./auth.routes.js";
import collectionRoutes from "./collection.routes.js";
import productRoutes from "./product.routes.js";
import CouponRoutes from "./coupon.routes.js";
import { authorize, isLoggedIn } from "../middleware/auth.middleware.js";

const router = Router();
router.use("/auth", authRoutes);
router.use("/collection", collectionRoutes);
router.use("/product", productRoutes);
router.use("/coupon", isLoggedIn, authorize("ADMIN"), CouponRoutes);

export default router;
