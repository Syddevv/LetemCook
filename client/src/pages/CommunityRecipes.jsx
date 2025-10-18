import React, { useRef, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Logo from "../assets/Logo.png";
import RecipeCard from "../components/RecipeCard";
import axios from "axios";

const CommunityRecipes = ({ collapsed, setCollapsed }) => {
  const navRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [recipes, setRecipes] = useState([]);

  // Fetch community recipes from backend
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/recipes/all");
        setRecipes(res.data);
      } catch (err) {
        console.error("Error fetching recipes:", err);
      }
    };

    fetchRecipes();
  }, []);

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

        <div className="recipes-wrapper">
          <div className="recipes-header">
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
          </div>

          <div className={`recipes ${collapsed ? "collapsed" : ""}`}>
            {recipes.length > 0 ? (
              recipes.map((recipe) => (
                <RecipeCard key={recipe._id} recipe={recipe} />
              ))
            ) : (
              <p>No recipes found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityRecipes;
