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
router.post("/deleteCollection/:id", deleteCollection);
router.post("/updateCollection/:id", updateCollection);
export default router;
