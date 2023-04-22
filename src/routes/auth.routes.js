import { Router } from "express";
import {
  forgotPassword,
  getProfile,
  login,
  logout,
  resetPassword,
  signUp,
} from "../controllers/auth.controllers.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";
const router = Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/logout", logout);
router.get("/profile", isLoggedIn, getProfile);

router.post("/password/forgot", forgotPassword);
router.post("/password/reset/:token", resetPassword);

export default router;
