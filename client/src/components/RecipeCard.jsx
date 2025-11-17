import LikeRecipe from "../assets/Like Recipe.png";
import Heart from "../assets/love.png";
import ServingIcon from "../assets/Serving Icon.png";
import Clock from "../assets/clock.png";
import ViewRecipeIcon from "../assets/link.png";
import "../styles/RecipeCard.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RecipeCard = ({ recipe, onLikeUpdate }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(recipe.likes);
  const navigate = useNavigate();

  const handleLike = async (recipeId) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/recipes/${recipeId}/like`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await res.json();

      if (data.success) {
        setLiked(data.liked);
        setLikes((prev) => (data.liked ? prev + 1 : prev - 1));
        onLikeUpdate();
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    const checkLikeStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/recipes/${
            recipe._id
          }/check-like`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setLiked(data.liked);
      } catch (err) {
        console.log(err.message);
      }
    };

    checkLikeStatus();
  }, [recipe._id]);

  return (
    <div className="recipes">
      <div className="recipe-box">
        <div className="recipe-image-wrapper">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="recipe-picture"
          />

          <div className="recipe-like">
            <img
              src={liked ? Heart : LikeRecipe}
              alt="Like"
              className="like-icon"
              onClick={() => handleLike(recipe._id)}
            />
            <span>{likes}</span>
          </div>
        </div>

        <div className="recipe-content">
          <h2 className="recipe-title">{recipe.title}</h2>
          <p className="recipe-desc">
            {recipe.description.length > 80
              ? recipe.description.slice(0, 55) + "..."
              : recipe.description}
          </p>

          <div className="recipe-info">
            <span>
              <img src={Clock} alt="Time" className="info-icon" />
              {recipe.cookingTime} &nbsp; mins
            </span>
            <span>
              <img src={ServingIcon} alt="Servings" className="info-icon" />
              {recipe.servings} &nbsp; servings
            </span>
          </div>
          <button
            className="view-recipe-btn"
            onClick={() => navigate(`/recipe-details/${recipe._id}`)}
          >
            <img
              src={ViewRecipeIcon}
              alt="view-recipe"
              className="view-recipe-icon"
            />
            View Recipe
          </button>

          <p className="recipe-source">
            by <strong>{recipe.user?.username}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
