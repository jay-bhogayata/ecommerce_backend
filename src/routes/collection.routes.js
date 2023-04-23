import { Router } from "express";
import {
  createCollection,
  deleteCollection,
  getAllCollection,
  updateCollection,
} from "../controllers/collection.controllers.js";
const router = Router();

router.post("/createCollection", createCollection);
router.get("/getAllCollection", getAllCollection);
router.delete("/deleteCollection/:id", deleteCollection);
router.put("/updateCollection/:id", updateCollection);
export default router;
