import Sidebar from "../components/Sidebar";
import Logo from "../assets/Logo.png";
import BackIcon from "../assets/back.png";
import { useNavigate } from "react-router-dom";
import EditIcon from "../assets/edit icon.png";
import "../styles/EditRecipe.css";

const EditRecipe = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();

  return (
    <div className="page-wrapper">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div
        className="page-wrapper-content"
        style={{
          marginLeft: collapsed ? "70px" : "340px",
          transition: "margin-left 0.3s",
        }}
      >
        <div
          className="header"
          style={{
            left: collapsed ? "70px" : "340px",
            right: 0,
            transition: "left 0.3s",
          }}
        >
          <div className="logo-webName">
            <img src={Logo} alt="Logo" className="web-logo" />
            <p className="web-name">Let'em Cook</p>
          </div>
        </div>

        <div className="edit-recipe-wrapper">
          <button
            className="back-to-discover-btn"
            onClick={() => navigate("/my-recipes")}
          >
            <img src={BackIcon} alt="back-icon" />
            Back
          </button>

          <div className="add-new-recipe-card">
            <form className="add-recipe-form-container">
              <h2 className="edit-recipe-title">
                <img src={EditIcon} alt="edit-icon" /> Edit Recipe
              </h2>
              <div className="add-recipe-form">
                <div className="left-inputs">
                  <div className="input-row-1">
                    <div className="input-group">
                      <label htmlFor="recipe-title">Recipe Title *</label>
                      <input
                        type="text"
                        id="recipe-title"
                        name="title"
                        required
                      />
                    </div>
                    <div className="input-group">
                      <label htmlFor="servings">Servings *</label>
                      <input
                        type="number"
                        id="servings"
                        name="servings"
                        required
                      />
                    </div>
                    <div className="input-group">
                      <label htmlFor="cooking-time">Cooking Time *</label>
                      <input
                        type="text"
                        id="cooking-time"
                        name="cookingTime"
                        required
                      />
                    </div>
                  </div>
                  <div className="input-row-2">
                    <div className="input-group wide">
                      <label htmlFor="description">Description *</label>
                      <textarea id="description" name="description" required />
                    </div>
                  </div>
                  <div className="input-row-3">
                    <div className="input-group wide">
                      <label htmlFor="ingredients">
                        Ingredients (comma-seperated) *
                      </label>
                      <textarea id="ingredients" name="ingredients" required />
                    </div>
                    <div class="input-row">
                      <div className="input-group">
                        <label htmlFor="recipeImage">Change Image *</label>
                        <input
                          type="file"
                          id="recipeImage"
                          name="recipeImage"
                          accept="image/*"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="right-inputs">
                  <div className="input-group instructions-group">
                    <label htmlFor="instructions">Instructions *</label>
                    <textarea id="instructions" name="instructions" required />
                  </div>
                  <button type="submit" className="share-recipe-btn">
                    Update Recipe
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRecipe;
