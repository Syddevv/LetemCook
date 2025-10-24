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
    const userId = req.user ? req.user._id : null;

    // If user is logged in, get their liked recipes
    let likedRecipes = [];
    if (userId) {
      const user = await User.findById(userId).select("likedRecipes");
      likedRecipes = user?.likedRecipes?.map((id) => id.toString()) || [];
    }

    // Add `liked` property to each recipe
    const recipesWithLikeStatus = recipes.map((recipe) => ({
      ...recipe.toObject(),
      liked: likedRecipes.includes(recipe._id.toString()),
    }));

    res.status(200).json(recipesWithLikeStatus);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user recipes" });
  }
};

// Delete recipe
export const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // delete the recipe
    await recipe.deleteOne();

    // decrementing total shared recipes by user
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { recipesSharedTotal: -1 },
      $push: { recipes: recipe._id },
    });
    res.json({ success: true, message: "Recipe deleted" });
  } catch (err) {
    console.error("DELETE RECIPE ERROR:", err.message);
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

    res.json(recipes);
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

// edit recipe
export const editRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      ingredients,
      instructions,
      servings,
      cookingTime,
      category,
    } = req.body;

    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res
        .status(404)
        .json({ success: false, message: "Recipe not found" });
    }

    let imageUrl = recipe.image;
    if (req.file) {
      const uploadResponse = await cloudinary.uploader.upload(req.file.path, {
        folder: "recipes",
      });
      imageUrl = uploadResponse.secure_url;
    }

    recipe.title = title || recipe.title;
    recipe.description = description || recipe.description;
    recipe.ingredients = ingredients || recipe.ingredients;
    recipe.instructions = instructions || recipe.instructions;
    recipe.servings = servings || recipe.servings;
    recipe.cookingTime = cookingTime || recipe.cookingTime;
    recipe.category = category || recipe.category;
    recipe.image = imageUrl;

    await recipe.save();

    return res.status(200).json({
      success: true,
      message: "Recipe updated successfully",
      recipe,
    });
  } catch (error) {
    console.error("EDIT RECIPE ERROR:", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// like recipe function
export const toggleLikeRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const userId = req.user._id;

    const user = await User.findById(userId);
    const recipe = await Recipe.findById(recipeId);

    const recipeOwnerId = recipe.user.toString();
    const alreadyLiked = user.likedRecipes.includes(recipeId);

    if (!recipe) {
      return res
        .status(404)
        .json({ success: false, message: "Recipe not found" });
    }

    if (alreadyLiked) {
      // unlike
      await Recipe.findByIdAndUpdate(recipeId, { $inc: { likes: -1 } });
      await User.findByIdAndUpdate(userId, {
        $pull: { likedRecipes: recipeId },
        $inc: { recipesLikedTotal: -1 },
      });
      await User.findByIdAndUpdate(recipeOwnerId, {
        $inc: { totalLikes: -1 },
      });

      return res.json({ success: true, liked: false });
    } else {
      // like
      await Recipe.findByIdAndUpdate(recipeId, { $inc: { likes: 1 } });
      await User.findByIdAndUpdate(userId, {
        $push: { likedRecipes: recipeId },
        $inc: { recipesLikedTotal: 1 },
      });
      await User.findByIdAndUpdate(recipeOwnerId, {
        $inc: { totalLikes: 1 },
      });

      return res.json({ success: true, liked: true });
    }
  } catch (error) {
    console.error("LIKE ERROR:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// checking like status
export const checkLikeStatus = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const userId = req.user._id;

    const user = await User.findById(userId);
    const isLiked = user.likedRecipes.includes(recipeId);

    res.json({ liked: isLiked });
  } catch (error) {
    console.error("CHECK LIKE STATUS ERROR:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// fetching liked recipes
export const getLikedRecipes = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate({
      path: "likedRecipes",
      populate: {
        path: "user",
        select: "username",
      },
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const likedRecipes = user.likedRecipes;
    res.status(200).json(likedRecipes);
  } catch (error) {
    console.error("GET LIKED RECIPES ERROR:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error fetching liked recipes" });
  }
};
