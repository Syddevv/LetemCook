import Sidebar from "../components/Sidebar";
import React, { useRef, useEffect, useState } from "react";
import Logo from "../assets/Logo.png";
import BackIcon from "../assets/back.png";
import "../styles/RecipeDetails.css";
import Pizza from "../assets/pizza.jpg";
import Clock from "../assets/clock.png";
import ServingIcon from "../assets/Serving Icon.png";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const RecipeDetails = ({ collapsed, setCollapsed }) => {
  const navRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [recipes, setRecipes] = useState([]);

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

  useEffect(() => {
    const fetchRecipe = async () => {
      const res = await axios.get(`http://localhost:5000/api/recipes/id/${id}`);
      setRecipes(res.data);
    };
    fetchRecipe();
  }, [id]);

  return (
    <div className="page-wrapper">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div
        className="page-wrapper-content"
        style={{
          marginLeft: collapsed ? "130px" : "400px",
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

        <div className="recipe-details-box">
          <button
            className="back-to-discover-btn"
            onClick={() => navigate("/community")}
          >
            <img src={BackIcon} alt="back-icon" />
            Back
          </button>

          <div className="col-1">
            <div className="recipe-image-box">
              <img src={recipes.image} alt="recipe-image" />
            </div>

            <div className="recipe-details-content">
              <h1>{recipes.title}</h1>
              <p className="recipe-information">{recipes.description}</p>

              <div className="recipe-info-icon-container">
                <span>
                  <img src={Clock} alt="Time" className="recipe-info-icon" />{" "}
                  {recipes.cookingTime} &nbsp; mins
                </span>
                <span>
                  <img
                    src={ServingIcon}
                    alt="Servings"
                    className="recipe-info-icon"
                  />
                  {recipes.servings} &nbsp; servings
                </span>
              </div>

              <hr />

              <p className="recipe-author">
                Recipe by <strong>{recipes.user?.username}</strong>
              </p>
            </div>
          </div>

          <div className="col-2">
            <div className="ingredients-wrapper">
              <p className="ingredients-wrapper-title">Ingredients</p>
              {recipes.ingredients &&
                recipes.ingredients.split(",").map((ingredient, index) => (
                  <div key={index} className="ingredients-card">
                    <p>
                      <span className="dot"></span>
                      {ingredient.trim()}
                    </p>
                  </div>
                ))}
            </div>

            <div className="instructions-wrapper">
              <p className="instructions-wrapper-title">Instructions</p>
              {recipes.instructions &&
                recipes.instructions
                  .split(/\d+\.\s+/)
                  .filter((step) => step.trim() !== "")
                  .map((step, index) => (
                    <div key={index} className="instructions-card">
                      <p className="instructions-num">{index + 1}</p>
                      <p>{step.trim()}</p>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
