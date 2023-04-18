import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getAllProduct,
  getProductByCollectionId,
  getProductById,
} from "../controllers/product.controllers.js";

const router = Router();

router.post("/addProduct", addProduct);
router.get("/getAllProduct", getAllProduct);
router.get("/getProductById/:id", getProductById);
router.post("/deleteProduct/:id", deleteProduct);
router.get("/getProductByCollectionId/:id", getProductByCollectionId);
export default router;
