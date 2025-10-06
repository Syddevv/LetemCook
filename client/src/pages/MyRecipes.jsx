import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../components/Sidebar";
import Logo from "../assets/Logo.png";
import Pasta from "../assets/pasta.jpg";
import Heart from "../assets/Total Likes.png";
import ServingIcon from "../assets/Serving Icon.png";
import Clock from "../assets/clock.png";
import Edit from "../assets/edit icon.png";
import Delete from "../assets/delete icon.png";
import "../styles/MyRecipes.css";

const MyRecipe = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        navRef.current.classList.add("transparent");
      } else {
        navRef.current.classList.remove("transparent");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          ref={navRef}
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

        <div className="my-recipes-wrapper">
          <div className="recipes-header">
            <h1>My Recipes</h1>
            <p>Create and manage your recipe collection</p>
          </div>

          <div className="add-new-recipe-card">
            <form className="add-recipe-form-container">
              <h2 className="add-recipe-title">+ Add New Recipe</h2>
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
                      <textarea
                        id="ingredients"
                        name="ingredients"
                        placeholder="Example: pizza dough, mozzarella, tomatoes"
                        required
                      />
                    </div>
                    <div class="input-row">
                      <div className="input-group">
                        <label htmlFor="recipeImage">Upload Image *</label>
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
                    <textarea
                      id="instructions"
                      name="instructions"
                      placeholder="Enter each step with a number. Example:
1. Preheat oven to 475°F (245°C)
2. Roll out pizza dough
3. Add sauce and cheese
4. Bake for 12–15 minutes"
                      required
                    />
                  </div>
                  <button type="submit" className="share-recipe-btn">
                    Share Recipe
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="my-recipes-box-wrapper">
            <h2 className="my-recipes-header">My Recipes (1)</h2>

            <div className="my-recipes">
              <div className="recipe-box">
                <div className="recipe-image-wrapper">
                  <img
                    src={Pasta}
                    alt="Classic Pasta Carbonara"
                    className="recipe-picture"
                  />

                  <div className="recipe-like">
                    <img src={Heart} alt="Like" className="like-icon" />
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
                      <img src={Clock} alt="Time" className="info-icon" /> 25
                      mins
                    </span>
                    <span>
                      <img
                        src={ServingIcon}
                        alt="Servings"
                        className="info-icon"
                      />
                      2 servings
                    </span>
                  </div>

                  <div className="recipe-buttons">
                    <button className="delete-recipe-btn">
                      <img
                        src={Delete}
                        alt="delete-icon"
                        className="delete-icon"
                      />
                      Delete
                    </button>

                    <button className="edit-recipe-btn">
                      <img src={Edit} alt="edit-icon" className="edit-icon" />
                      Edit
                    </button>
                  </div>

                  <p className="recipe-source">by Foodista.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyRecipe;
