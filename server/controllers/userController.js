import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Recipe from "../models/Recipe.js";
import { cloudinary } from "../utils/cloudinary.js";

dotenv.config();

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already taken" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedpassword,
    });

    await newUser.save();

    return res
      .status(200)
      .json({ success: true, message: "Successfull Registration" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error during registration" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(409)
        .json({ success: false, message: "User does not exist" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res
        .status(409)
        .json({ success: false, message: "Wrong credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        id: user._id,
        username: user.username,
        email: user.email,
        cookingTitle: user.cookingTitle,
        profilePicture: user.profilePicture,
        bio: user.bio,
        totalLikes: user.totalLikes,
        recipesLiked: user.recipesLiked,
        recipesSharedTotal: user.recipesSharedTotal,
        recipes: user.recipes,
        cookingStreak: user.cookingStreak,
        likedRecipesTotal: user.likedRecipesTotal,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error in Login Server" });
  }
};

export const verifyUser = async (req, res) => {
  return res.status(200).json({ success: true, user: req.user });
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Count totals
    const recipesSharedTotal = await Recipe.countDocuments({ user: userId });
    const recipesLikedTotal = user.likedRecipes?.length || 0;

    res.status(200).json({
      ...user.toObject(),
      recipesSharedTotal,
      recipesLikedTotal,
    });
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, userBio, cookingTitle } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    let imageUrl = user.profilePicture;
    if (req.file) {
      const uploadResponse = await cloudinary.uploader.upload(req.file.path, {
        folder: "user",
      });
      imageUrl = uploadResponse.secure_url;
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.userBio = userBio || user.userBio;
    user.cookingTitle = cookingTitle || user.cookingTitle;
    user.profilePicture = imageUrl;

    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    console.error("ERROR UPDATING PROFILE", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const userId = req.user._id;
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(userId).select("+password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const ok = await bcrypt.compare(currentPassword, user.password);
    if (!ok) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    return res.status(200).json({ success: true, message: "Password changed" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error during password update" });
  }
};
