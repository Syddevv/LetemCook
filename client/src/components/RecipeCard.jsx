import Pasta from "../assets/pasta.jpg";
import LikeRecipe from "../assets/Like Recipe.png";
import ServingIcon from "../assets/Serving Icon.png";
import Clock from "../assets/clock.png";
import ViewRecipeIcon from "../assets/link.png";
import "../styles/RecipeCard.css";

const RecipeCard = () => {
  return (
    <div className="recipes">
      <div className="recipe-box">
        <div className="recipe-image-wrapper">
          <img
            src={Pasta}
            alt="Classic Pasta Carbonara"
            className="recipe-picture"
          />

          <div className="recipe-like">
            <img src={LikeRecipe} alt="Like" className="like-icon" />
            <span>23</span>
          </div>
        </div>

        <div className="recipe-content">
          <h2 className="recipe-title">Classic Pasta Carbonara</h2>
          <p className="recipe-desc">
            A creamy Roman pasta dish made with eggs, cheese, and ...
          </p>
          <div className="recipe-info">
            <span>
              <img src={Clock} alt="Time" className="info-icon" /> 25 mins
            </span>
            <span>
              <img src={ServingIcon} alt="Servings" className="info-icon" />2
              servings
            </span>
          </div>
          <button className="view-recipe-btn">
            <img
              src={ViewRecipeIcon}
              alt="view-recipe"
              className="view-recipe-icon"
            />
            View Recipe
          </button>

          <p className="recipe-source">by Foodista.com</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
