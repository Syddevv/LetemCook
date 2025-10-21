import express from "express";
import {
  addRecipe,
  getUserRecipes,
  deleteRecipe,
  getRecipes,
  getRecipeById,
  editRecipe,
} from "../controllers/recipeController.js";
import { middleware } from "../middlewares/middleware.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", middleware, upload.single("recipeImage"), addRecipe);
router.get("/my-recipes", middleware, getUserRecipes);
router.delete("/:id", middleware, deleteRecipe);
router.get("/", getRecipes);
router.get("/id/:id", getRecipeById);
router.put("/:id", upload.single("image"), editRecipe);

export default router;
