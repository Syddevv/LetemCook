import Sidebar from "../components/Sidebar";
import React, { useState, useRef, useEffect } from "react";
import Logo from "../assets/Logo.png";
import BackIcon from "../assets/back.png";
import "../styles/RecipeDetails.css";
import Pizza from "../assets/pizza.jpg";
import Clock from "../assets/clock.png";
import ServingIcon from "../assets/Serving Icon.png";
import { useNavigate } from "react-router-dom";

const RecipeDetails = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navRef = useRef(null);
  const navigate = useNavigate();

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
            onClick={() => navigate("/discover")}
          >
            <img src={BackIcon} alt="back-icon" />
            Back
          </button>

          <div className="col-1">
            <div className="recipe-image-box">
              <img src={Pizza} alt="recipe-image" />
            </div>

            <div className="recipe-details-content">
              <h1>Homemade Pizza Margherita</h1>
              <p className="recipe-information">
                Fresh tomatoes, mozzarella, and basil on a crispy homemade
                crust. Pizza perfection!
              </p>

              <div className="recipe-info-icon-container">
                <span>
                  <img src={Clock} alt="Time" className="recipe-info-icon" /> 25
                  mins
                </span>
                <span>
                  <img
                    src={ServingIcon}
                    alt="Servings"
                    className="recipe-info-icon"
                  />
                  2 servings
                </span>
              </div>

              <hr />

              <p className="recipe-author">
                Recipe by <strong>Italian Kitchen</strong>
              </p>
            </div>
          </div>

          <div className="col-2">
            <div className="ingredients-wrapper">
              <p className="ingredients-wrapper-title">Ingredients</p>
              <div className="ingredients-card">
                <p>
                  <span className="dot"></span>Pizza Dough
                </p>
              </div>

              <div className="ingredients-card">
                <p>
                  <span className="dot"></span>Tomatoes
                </p>
              </div>

              <div className="ingredients-card">
                <p>
                  <span className="dot"></span>Mozzarella
                </p>
              </div>

              <div className="ingredients-card">
                <p>
                  <span className="dot"></span>Fresh Basil
                </p>
              </div>

              <div className="ingredients-card">
                <p>
                  <span className="dot"></span>olive Oil
                </p>
              </div>
            </div>

            <div className="instructions-wrapper">
              <p className="instructions-wrapper-title">Instructions</p>
              <div className="instructions-card">
                <p className="instructions-num">1</p>
                <p>Preheat oven to 475°F (245°C)</p>
              </div>

              <div className="instructions-card">
                <p className="instructions-num">2</p>
                <p>
                  Roll out pizza dough on a floured surface to desired thickness
                </p>
              </div>

              <div className="instructions-card">
                <p className="instructions-num">3</p>
                <p>Transfer dough to a pizza stone or baking sheet</p>
              </div>

              <div className="instructions-card">
                <p className="instructions-num">4</p>
                <p>
                  Brush with olive oil and add a thin layer of crushed tomatoes
                </p>
              </div>

              <div className="instructions-card">
                <p className="instructions-num">5</p>
                <p>Tear mozzarella into chunks and distribute evenly</p>
              </div>

              <div className="instructions-card">
                <p className="instructions-num">6</p>
                <p>
                  Bake for 12-15 minutes until crust is golden and cheese is
                  bubbly
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
