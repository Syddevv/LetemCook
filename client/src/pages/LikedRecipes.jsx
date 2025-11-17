import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import RecipeCard from "../components/RecipeCard";
import Logo from "../assets/Logo.png";
import axios from "axios";
import Heart from "../assets/Total Likes.png";
import { useAuth } from "../context/authContext";
import "../styles/LikedRecipes.css";
import { motion } from "framer-motion";
import CollapseOpen from "../assets/open-mobile-sidebar-icon.png";

const LikedRecipes = ({ collapsed, setCollapsed }) => {
  const navRef = useRef(null);
  const [likedRecipes, setLikedRecipes] = useState([]);
  const { user, refreshUserProfile } = useAuth();
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

  const fetchLikedRecipes = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/recipes/liked-recipes`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      refreshUserProfile();
      setLikedRecipes(res.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchLikedRecipes();
  }, []);

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

        <div className="recipes-wrapper">
          <motion.div
            className="recipes-header"
            variants={headerVariants}
            initial="hidden"
            animate="visible"
          >
            <div>
              <h1>Liked Recipes</h1>
              <p>Your favorite recipes collection</p>
              {user && <p>{user.recipesLikedTotal} liked recipes.</p>}
            </div>
          </motion.div>

          {/* LIKED RECIPES */}
          <div
            className="liked-recipes"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "15px",
            }}
          >
            {likedRecipes.length > 0 ? (
              likedRecipes.map((recipe, index) => (
                <motion.div
                  key={recipe._id}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.03, y: -5 }}
                  variants={recipeCardVariants}
                >
                  <RecipeCard
                    recipe={recipe}
                    onLikeUpdate={fetchLikedRecipes}
                  />
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
                    src={Heart}
                    alt="no recipes"
                    className="no-liked-heart"
                  />
                </div>
                <h3>No liked recipes yet</h3>
                <p>Start exploring and like recipes you love!</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LikedRecipes;
