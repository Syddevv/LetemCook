import Sidebar from "../components/Sidebar";
import React, { useRef, useEffect, useState } from "react";
import Logo from "../assets/Logo.png";
import BackIcon from "../assets/back.png";
import "../styles/RecipeDetails.css";
import Clock from "../assets/clock.png";
import ServingIcon from "../assets/Serving Icon.png";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import CollapseOpen from "../assets/open-mobile-sidebar-icon.png";

const RecipeDetails = ({ collapsed, setCollapsed }) => {
  const navRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [recipes, setRecipes] = useState([]);
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
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/recipes/id/${id}`
      );
      setRecipes(res.data);
    };
    fetchRecipe();
  }, [id]);

  const fadePop = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const slideLeftToRight = {
    hidden: { opacity: 0, x: -50 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
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
          marginLeft: isMobile ? "0" : collapsed ? "71px" : "320px",
          transition: "margin-left 0.3s",
        }}
      >
        {/* HEADER */}
        <motion.div
          ref={navRef}
          className="header"
          style={{
            // --- Corrected left value ---
            left: isMobile ? "0" : collapsed ? "71px" : "320px",
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

        <div className="recipe-details-box">
          <button
            className="back-to-discover-btn"
            onClick={() => navigate("/community")}
          >
            <img src={BackIcon} alt="back-icon" />
            Back
          </button>

          <div className="col-1">
            {/* IMAGE */}
            <motion.div
              className="recipe-image-box"
              variants={fadePop}
              initial="hidden"
              animate="visible"
            >
              <img src={recipes.image} alt="recipe-image" />
            </motion.div>

            {/* RECIPE INFO */}
            <motion.div
              className="recipe-details-content"
              variants={fadePop}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
            >
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
            </motion.div>
          </div>

          <div className="col-2">
            {/* INGREDIENTS */}
            <div className="ingredients-wrapper">
              <p className="ingredients-wrapper-title">Ingredients</p>
              {recipes.ingredients &&
                recipes.ingredients.split(",").map((ingredient, index) => (
                  <motion.div
                    key={index}
                    className="ingredients-card"
                    variants={slideLeftToRight}
                    initial="hidden"
                    animate="visible"
                    custom={index}
                  >
                    <p>
                      <span className="dot"></span>
                      {ingredient.trim()}
                    </p>
                  </motion.div>
                ))}
            </div>

            {/* INSTRUCTIONS */}
            <div className="instructions-wrapper">
              <p className="instructions-wrapper-title">Instructions</p>
              {recipes.instructions &&
                recipes.instructions
                  .split(/\d+\.\s+/)
                  .filter((step) => step.trim() !== "")
                  .map((step, index) => (
                    <motion.div
                      key={index}
                      className="instructions-card"
                      variants={slideLeftToRight}
                      initial="hidden"
                      animate="visible"
                      custom={index + 1}
                    >
                      <p className="instructions-num">{index + 1}</p>
                      <p>{step.trim()}</p>
                    </motion.div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
