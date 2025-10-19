import Heart from "../assets/Total Likes.png";
import ServingIcon from "../assets/Serving Icon.png";
import Clock from "../assets/clock.png";
import Edit from "../assets/edit icon.png";
import Delete from "../assets/delete icon.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const UserRecipeCard = ({ recipe }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="recipe-box">
      <div className="recipe-image-wrapper">
        <img src={recipe.image} alt={recipe.title} className="recipe-picture" />

        <div className="recipe-like">
          <img src={Heart} alt="Like" className="like-icon" />
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
            <img src={Clock} alt="Time" className="info-icon" />{" "}
            {recipe.cookingTime} &nbsp; mins
          </span>
          <span>
            <img src={ServingIcon} alt="Servings" className="info-icon" />
            {recipe.servings} &nbsp; servings
          </span>
        </div>

        <div className="recipe-buttons">
          <button className="delete-recipe-btn">
            <img src={Delete} alt="delete-icon" className="delete-icon" />
            Delete
          </button>

          <button
            className="edit-recipe-btn"
            onClick={() => navigate("/edit-recipe")}
          >
            <img src={Edit} alt="edit-icon" className="edit-icon" />
            Edit
          </button>
        </div>

        <p className="recipe-source">
          by <strong>{user && user.username}</strong>
        </p>
      </div>
    </div>
  );
};

export default UserRecipeCard;
