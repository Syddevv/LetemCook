import express from "express";
import {
  registerUser,
  loginUser,
  verifyUser,
  getProfile,
} from "../controllers/userController.js";
import { middleware } from "../middlewares/middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify", middleware, verifyUser);
router.get("/profile", middleware, getProfile);

export default router;
