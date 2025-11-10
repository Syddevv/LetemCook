import React, { useRef, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Logo from "../assets/Logo.png";
import RecipeCard from "../components/RecipeCard";
import NoRecipeIcon from "../assets/no-category-recipe.png";
import axios from "axios";
import { motion } from "framer-motion";

const CommunityRecipes = ({ collapsed, setCollapsed }) => {
  const navRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [recipes, setRecipes] = useState([]);

  // Fetch all community recipes from backend
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/recipes?category=${selectedCategory}`
        );
        setRecipes(res.data);
      } catch (err) {
        console.error("Error fetching recipes:", err);
      }
    };

    fetchRecipes();
  }, [selectedCategory]);

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

  const recipeCardVariants = {
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
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div
        className="page-wrapper-content"
        style={{
          marginLeft: collapsed ? "70px" : "340px",
          transition: "margin-left 0.3s",
        }}
      >
        {/* HEADER */}
        <motion.div
          ref={navRef}
          className="header"
          style={{
            left: collapsed ? "70px" : "340px",
            right: 0,
            transition: "left 0.3s",
          }}
          variants={headerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="logo-webName">
            <img src={Logo} alt="Logo" className="web-logo" />
            <p className="web-name">Let'em Cook</p>
          </div>
        </motion.div>

        {/* Recipes */}
        <div className="recipes-wrapper">
          <motion.div
            className="recipes-header"
            variants={headerVariants}
            initial="hidden"
            animate="visible"
          >
            <div>
              <h1>Community Recipes</h1>
              <p>Explore delicious recipes from our community</p>
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-select"
            >
              <option value="all">All Categories</option>
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
          </motion.div>

          {/* RECIPE CARD */}
          <div className={`recipes ${collapsed ? "collapsed" : ""}`}>
            {recipes.length > 0 ? (
              recipes.map((recipe, index) => (
                <motion.div
                  key={recipe._id}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={recipeCardVariants}
                >
                  <RecipeCard recipe={recipe} />
                </motion.div>
              ))
            ) : (
              <motion.div
                className="no-liked-recipes"
                initial="hidden"
                animate="visible"
                variants={recipeCardVariants}
              >
                <div className="no-liked-circle">
                  <img
                    src={NoRecipeIcon}
                    alt="no recipes"
                    className="no-liked-heart"
                  />
                </div>
                <h3>No {selectedCategory} recipes yet</h3>
                <p>Try selecting a different category!</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityRecipes;
