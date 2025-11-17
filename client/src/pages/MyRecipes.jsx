import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Logo from "../assets/Logo.png";
import "../styles/MyRecipes.css";
import UserRecipeCard from "../components/UserRecipeCard";
import NoRecipeIcon from "../assets/no-category-recipe.png";
import { useAuth } from "../context/authContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { motion } from "framer-motion";
import CollapseOpen from "../assets/open-mobile-sidebar-icon.png";

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
  const [loading, setLoading] = useState(false);
  const MySwal = withReactContent(Swal);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => setIsMobileSidebarOpen((prev) => !prev);

  // handle screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 992);
      if (window.innerWidth > 992) {
        setIsMobileSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
  }, [recipes]);

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

    const result = await MySwal.fire({
      title: "Share this recipe?",
      text: "Once shared, it will be visible to others.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, share it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#d33",
    });

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key !== "image") data.append(key, formData[key]);
    });

    if (imageFile) {
      data.append("recipeImage", imageFile);
    }

    if (result.isConfirmed) {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        await axios.post("http://localhost:5000/api/recipes", data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });

        MySwal.fire("Shared!", "Your recipe has been shared.", "success");
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
      } finally {
        setLoading(false);
      }
    }
  };

  // handle deletion of recipe
  const deleteRecipe = async (id) => {
    const result = await MySwal.fire({
      title: "Are you sure?",
      text: "This recipe will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
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
          MySwal.fire(
            "Recipe Deleted!",
            "Recipe is succesfully deleted.",
            "success"
          );
        }
      } catch (err) {
        console.log("Failed to delete recipe", err.message);
      }
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

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const addCardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  };

  const userRecipeVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    }),
  };

  return (
    <div className="page-wrapper">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        isMobile={isMobile}
        isMobileSidebarOpen={isMobileSidebarOpen}
        toggleMobileSidebar={toggleMobileSidebar}
      />

      {isMobile && isMobileSidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleMobileSidebar}></div>
      )}

      <div
        className="page-wrapper-content"
        style={{
          marginLeft: isMobile ? "0" : collapsed ? "71px" : "341px",
          transition: "margin-left 0.3s",
        }}
      >
        {/* HEADER */}
        <motion.div
          ref={navRef}
          className="header"
          style={{
            // --- Corrected left value ---
            left: isMobile ? "0" : collapsed ? "71px" : "341px",
            right: 0,
            transition: "left 0.3s",
          }}
          variants={headerVariants}
          initial="hidden"
          animate="visible"
        >
          {isMobile && (
            <button className="mobile-menu-btn" onClick={toggleMobileSidebar}>
              <img src={CollapseOpen} alt="Open Menu" />
            </button>
          )}

          <div className="logo-webName">
            <img src={Logo} alt="Logo" className="web-logo" />
            <p className="web-name">Let'em Cook</p>
          </div>
        </motion.div>

        <div className="my-recipes-wrapper">
          {/* Header */}
          <motion.div
            className="recipes-header-2"
            variants={headerVariants}
            initial="hidden"
            animate="visible"
          >
            <h1>My Recipes</h1>
            <p>Create and manage your recipe collection</p>
          </motion.div>

          {/* Add New Recipe Card */}
          <motion.div
            className="add-new-recipe-card"
            variants={addCardVariants}
            initial="hidden"
            animate="visible"
          >
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
                      <div className="input-group image-group">
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
                    {loading ? "Uploading recipe..." : "Share Recipe"}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>

          {/* User Recipes */}
          <div className="my-recipes-box-wrapper">
            <motion.h2
              className="my-recipes-header"
              variants={headerVariants}
              initial="hidden"
              animate="visible"
            >
              My Recipes ({user && user.recipesSharedTotal})
            </motion.h2>

            <div className="my-recipes">
              {recipes.length > 0 ? (
                recipes.map((recipe, index) => (
                  <motion.div
                    key={recipe._id}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={userRecipeVariants}
                  >
                    <UserRecipeCard recipe={recipe} onDelete={deleteRecipe} />
                  </motion.div>
                ))
              ) : (
                <div className="no-user-recipes">
                  <div className="no-recipe-circle">
                    <img
                      src={NoRecipeIcon}
                      alt="heart icon"
                      className="no-recipe-heart"
                    />
                  </div>
                  <h3>No recipes yet</h3>
                  <p>Upload recipes to view it here!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyRecipe;
