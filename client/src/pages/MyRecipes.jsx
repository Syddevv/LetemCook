import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Logo from "../assets/Logo.png";
import "../styles/MyRecipes.css";
import UserRecipeCard from "../components/UserRecipeCard";
import { useAuth } from "../context/authContext";

const MyRecipe = ({ collapsed, setCollapsed }) => {
  const navRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: "",
    instructions: "",
    servings: "",
    cookingTime: "",
    image: null,
    likes: 0,
    category: "Main Course",
  });
  const [recipes, setRecipes] = useState([]);
  const { user } = useAuth();

  // get user recipes
  useEffect(() => {
    const fetchUserRecipes = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:5000/api/recipes/my-recipes",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRecipes(res.data);
      } catch (error) {
        console.error("Error in fetching user recipes:", error.message);
      }
    };

    fetchUserRecipes();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); // for preview
    }
  };

  const handleClear = () => {
    setImageFile(null);
    setImagePreview(null);
    fileInputRef.current.value = "";
  };

  const fileInputRef = useRef();

  // handle the submission of recipe
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key !== "image") data.append(key, formData[key]);
    });

    if (imageFile) {
      data.append("image", imageFile);
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/recipes", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      window.location.reload();
      alert("Recipe added successfully!");

      setFormData({
        title: "",
        description: "",
        ingredients: "",
        instructions: "",
        servings: "",
        cookingTime: "",
        recipeImage: null,
        likes: "",
        category: "",
      });
      setImageFile(null);
      setImagePreview(null);
    } catch (err) {
      console.error("UPLOAD ERROR:", err);
      alert("Failed to add recipe");
    }
  };

  // handle deletion of recipe
  const deleteRecipe = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(
        `http://localhost:5000/api/recipes/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setRecipes((prev) => prev.filter((recipe) => recipe._id !== id));
        window.location.reload();
        alert("Recipe deleted successfully");
      }
    } catch (err) {
      console.log("Failed to delete recipe", err.message);
    }
  };

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
          <div className="recipes-header-2">
            <h1>My Recipes</h1>
            <p>Create and manage your recipe collection</p>
          </div>

          <div className="add-new-recipe-card">
            <form onSubmit={handleSubmit} className="add-recipe-form-container">
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
                        value={formData.title}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="input-group">
                      <label htmlFor="servings">Servings *</label>
                      <input
                        type="number"
                        id="servings"
                        name="servings"
                        value={formData.servings}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="input-group">
                      <label htmlFor="cooking-time">Cooking Time *</label>
                      <input
                        type="number"
                        id="cooking-time"
                        name="cookingTime"
                        value={formData.cookingTime}
                        placeholder="in minutes: ex. 20"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="input-row-2">
                    <div className="input-group wide">
                      <label htmlFor="description">Description *</label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="input-group">
                      <label htmlFor="category">Category *</label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        className="category"
                        onChange={handleChange}
                      >
                        <option value="main course">Main Course</option>
                        <option value="side dish">Side Dish</option>
                        <option value="dessert">Dessert</option>
                        <option value="appetizer">Appetizer</option>
                        <option value="salad">Salad</option>
                        <option value="breakfast">Breakfast</option>
                        <option value="soup">Soup</option>
                        <option value="beverage">Beverage</option>
                        <option value="snack">Snack</option>
                        <option value="drink">Drink</option>
                      </select>
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
                        value={formData.ingredients}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div class="input-row">
                      <div
                        className="input-group"
                        style={{ marginTop: "32px" }}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          name="recipeImage"
                          onChange={handleFileChange}
                          ref={fileInputRef}
                        />

                        {imagePreview && (
                          <div>
                            <img
                              src={imagePreview}
                              alt="Preview"
                              style={{
                                width: "150px",
                                height: "150px",
                                objectFit: "cover",
                                borderRadius: "4px",
                              }}
                            />
                            <button onClick={handleClear}>Remove</button>
                          </div>
                        )}
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
                      value={formData.instructions}
                      onChange={handleChange}
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
            <h2 className="my-recipes-header">
              My Recipes ({user && user.recipesSharedTotal})
            </h2>

            <div className="my-recipes">
              {recipes.length > 0 ? (
                recipes.map((recipe) => (
                  <UserRecipeCard
                    key={recipe._id}
                    recipe={recipe}
                    onDelete={deleteRecipe}
                  />
                ))
              ) : (
                <p>No recipes found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyRecipe;
