import mongoose, { mongo } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: {
      type: String,
      default: "",
    },
    cookingTitle: {
      type: String,
      default: "Home Cook",
    },
    userBio: { type: String, default: "" },
    recipesSharedTotal: {
      type: Number,
      default: 0,
    },
    recipes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe",
      },
    ],

    totalLikes: {
      type: Number,
      default: 0,
    },
    recipesLikedTotal: {
      type: Number,
      default: 0,
    },
    likedRecipes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe",
      },
    ],
    mostLikedRecipe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
      default: null,
    },
    cookingStreak: {
      type: Number,
      default: 0,
    },
    lastActivityDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const User = new mongoose.model("User", UserSchema);
export default User;
