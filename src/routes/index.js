import { Router } from "express";
import authRoutes from "./auth.routes.js";
import collectionRoutes from "./collection.routes.js";

const router = Router();
router.use("/auth", authRoutes);
router.use("/collection", collectionRoutes);
export default router;
