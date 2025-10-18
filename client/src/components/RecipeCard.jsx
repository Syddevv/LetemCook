import Pasta from "../assets/pasta.jpg";
import LikeRecipe from "../assets/Like Recipe.png";
import Heart from "../assets/love.png";
import ServingIcon from "../assets/Serving Icon.png";
import Clock from "../assets/clock.png";
import ViewRecipeIcon from "../assets/link.png";
import "../styles/RecipeCard.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

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
              onClick={() => (liked ? setLiked(false) : setLiked(true))}
            />
            <span>{recipe.likes}</span>
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
            onClick={() => navigate("/recipe-details")}
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
