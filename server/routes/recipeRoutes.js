import express from "express";
import {
  addRecipe,
  getUserRecipes,
  deleteRecipe,
  getAllRecipes,
  getRecipeById,
} from "../controllers/recipeController.js";
import { middleware } from "../middlewares/middleware.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", middleware, upload.single("recipeImage"), addRecipe);
router.get("/my-recipes", middleware, getUserRecipes);
router.delete("/:id", middleware, deleteRecipe);
router.get("/all", getAllRecipes);
router.get("/:id", getRecipeById);

export default router;
