import express from "express";
import {
  registerUser,
  loginUser,
  verifyUser,
  getProfile,
  updateProfile,
} from "../controllers/userController.js";
import { middleware } from "../middlewares/middleware.js";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify", middleware, verifyUser);
router.get("/profile", middleware, getProfile);
router.put("/:id", middleware, upload.single("profilePicture"), updateProfile);

export default router;
