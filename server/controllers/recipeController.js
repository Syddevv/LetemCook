import Recipe from "../models/Recipe.js";
import { cloudinary } from "../utils/cloudinary.js";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

// Add new recipe
export const addRecipe = async (req, res) => {
  try {
    const {
      title,
      servings,
      cookingTime,
      description,
      ingredients,
      instructions,
      likes,
      category,
    } = req.body;

    let imageUrl = null;

    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "recipes",
      });
      imageUrl = uploadResult.secure_url;
    }

    const newRecipe = await Recipe.create({
      title,
      servings,
      cookingTime,
      description,
      ingredients,
      instructions,
      likes,
      image: imageUrl,
      user: req.user._id,
      category,
    });

    // incrementing total shared recipes by user
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { recipesSharedTotal: 1 },
      $push: { recipes: newRecipe._id },
    });

    res.status(201).json({
      success: true,
      message: "Recipe added successfully",
      recipe: newRecipe,
    });
  } catch (error) {
    console.error("ADD RECIPE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Get all recipes by user
export const getUserRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ user: req.user.id });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user recipes" });
  }
};

// Delete recipe
export const deleteRecipe = async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: "Recipe deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting recipe" });
  }
};

// get all recipes
export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate("user", "username"); // if you store user ID
    res.status(200).json(recipes);
  } catch (error) {
    console.error("GET ALL RECIPES ERROR:", error);
    res.status(500).json({ message: "Failed to fetch community recipes" });
  }
};
