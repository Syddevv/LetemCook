import Recipe from "../models/Recipe.js";
import { cloudinary } from "../utils/cloudinary.js";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

// add new recipe
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

// get all recipes by user
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

// get all recipes / recipes by category
export const getRecipes = async (req, res) => {
  try {
    const category = req.query.category;
    let recipes;

    if (!category || category === "all") {
      recipes = await Recipe.find().populate("user", "username");
    } else {
      recipes = await Recipe.find({
        category: {
          $regex: new RegExp(`^${category}$`, "i"),
        },
      }).populate("user", "username");
    }

    res.status(200).json(recipes);
  } catch (error) {
    console.error("ERROR FETCHING RECIPES:", error.message);
    res.status(500).json({ message: "Failed to fetch community recipes" });
  }
};

// get recipe by id
export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate(
      "user",
      "username"
    );

    if (!recipe) {
      return res
        .status(404)
        .json({ success: false, message: "Recipe not found" });
    }

    res.status(200).json(recipe);
  } catch (error) {
    console.error("GET RECIPE BY ID ERROR:", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
