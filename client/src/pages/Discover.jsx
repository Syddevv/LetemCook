import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Logo from "../assets/Logo.png";
import RecipeCard from "../components/RecipeCard";
import "../styles/Discover.css";

const DiscoverRecipes = () => {
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
    <div className="discover-wrapper">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div
        className="discover-wrapper-content"
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
            <h1>Discover Recipes</h1>
            <p>Discover mouth-watering recipes from across the web</p>
          </div>

          <div className={`recipes ${collapsed ? "collapsed" : ""}`}>
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoverRecipes;
