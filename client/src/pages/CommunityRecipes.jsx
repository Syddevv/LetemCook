import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../components/SideBar";
import Logo from "../assets/Logo.png";
import Pasta from "../assets/pasta.jpg";
import LikeRecipe from "../assets/Like Recipe.png";
import ServingIcon from "../assets/Serving Icon.png";
import Clock from "../assets/clock.png";
import ViewRecipeIcon from "../assets/link.png";
import "../styles/Community.css";

const CommunityRecipes = () => {
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

        <div className="recipes-wrapper">
          <div className="recipes-header">
            <h1>Community Recipes</h1>
            <p>Explore delicious recipes from our community</p>
          </div>

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
                    <img
                      src={ServingIcon}
                      alt="Servings"
                      className="info-icon"
                    />
                    2 servings
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
        </div>
      </div>
    </div>
  );
};

export default CommunityRecipes;
