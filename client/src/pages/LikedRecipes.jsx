import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import RecipeCard from "../components/RecipeCard";
import Logo from "../assets/Logo.png";
import axios from "axios";
import { useAuth } from "../context/authContext";

const LikedRecipes = ({ collapsed, setCollapsed }) => {
  const navRef = useRef(null);
  const [likedRecipes, setLikedRecipes] = useState([]);
  const { user, refreshUserProfile } = useAuth();

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
        "http://localhost:5000/api/recipes/liked-recipes",
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
          <div className="recipes-header-2">
            <h1>Liked Recipes</h1>
            <p>Your favorite recipes collection</p>
            {user && <p>{user.recipesLikedTotal} liked recipes.</p>}
          </div>

          <div
            className="liked-recipes"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "15px",
            }}
          >
            {likedRecipes.length > 0 ? (
              likedRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe._id}
                  recipe={recipe}
                  onLikeUpdate={fetchLikedRecipes}
                />
              ))
            ) : (
              <p className="no-recipes">No liked recipes yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LikedRecipes;
