import React, { useRef, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Logo from "../assets/Logo.png";
import "../styles/Profile.css";
import DefaultPic from "../assets/default profile.png";
import Calendar from "../assets/Member Since.png";
import TotalLikes from "../assets/Total Likes.png";
import RecipesLiked from "../assets/Recipes Liked.png";
import RecipesShared from "../assets/Recipes Shared.png";
import MacAndCheese from "../assets/mac & cheese.jpg";
import StreakIcon from "../assets/Cooking Streak.png";
import { useAuth } from "../context/authContext";
import axios from "axios";

const Profile = ({ collapsed, setCollapsed }) => {
  const navRef = useRef(null);
  const { user, refreshUserProfile } = useAuth();
  const [mostLikedRecipe, setMostLikedRecipe] = useState(null);

  const fetchMostLikedRecipe = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:5000/api/recipes/most-liked",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMostLikedRecipe(res.data.recipe || res.data);
    } catch (err) {
      console.error("Error fetching most liked recipe:", err.message);
    }
  };

  useEffect(() => {
    fetchMostLikedRecipe();
  }, []);

  useEffect(() => {
    refreshUserProfile();
  }, [refreshUserProfile]);

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

        <div className="profile-container">
          <div className="profile-header">
            <h1>Profile</h1>
            <p>Your cooking journey and achievements</p>
          </div>

          <div className="profile-cards-wrapper">
            <div className="profile-grid-1">
              {/* Profile Info */}
              <div className="profile-card profile-info">
                {user && (
                  <img
                    src={user.profilePicture ? user.profilePicture : DefaultPic}
                    alt="profile-picture"
                  />
                )}
                {user && <h3>@{user.username}</h3>}
                {user && <p>{user.cookingTitle}</p>}

                {user?.userBio ? (
                  <blockquote>{user.userBio}</blockquote>
                ) : (
                  <blockquote>No bio</blockquote>
                )}
              </div>

              {/* First row stats */}
              <div className="stats1">
                <div className="profile-card">
                  {user && <h3>{user.recipesSharedTotal}</h3>}
                  <p>Recipes Shared</p>
                  <img
                    src={RecipesShared}
                    alt="recipes-shared-icon"
                    className="icon"
                  />
                </div>

                <div className="profile-card">
                  {user && <h3>{user.totalLikes}</h3>}
                  <p>Total Likes</p>
                  <img
                    src={TotalLikes}
                    alt="total-likes-icon"
                    className="icon"
                  />
                </div>
              </div>

              {/* Second row stats */}
              <div className="stats2">
                <div className="profile-card">
                  {user && <h3>{user.recipesLikedTotal}</h3>}
                  <p>Recipes Liked</p>
                  <img
                    src={RecipesLiked || 0}
                    alt="recipes-liked-icon"
                    className="icon"
                  />
                </div>

                <div className="profile-card">
                  <h3>Today</h3>
                  <p>Member Since</p>
                  <img src={Calendar} alt="calendar-icon" className="icon" />
                </div>
              </div>
            </div>

            <div className="profile-grid-2">
              <div className="most-liked-recipe">
                <div className="most-liked-recipe-header">
                  <p className="header-title">Most Liked Recipe</p>
                  <div className="likes-count">
                    <img
                      src={TotalLikes}
                      alt="most-like-recipe-heart"
                      className="total-likes-icon"
                    />
                    <p>{mostLikedRecipe?.likes ?? 0}</p>
                  </div>
                </div>

                {mostLikedRecipe ? (
                  <div className="recipe-description">
                    <img
                      src={mostLikedRecipe.image || DefaultPic}
                      alt="recipe-img"
                    />
                    <p className="recipe-name">{mostLikedRecipe.title}</p>
                    <p className="recipe-details">
                      {mostLikedRecipe.description.length > 80
                        ? mostLikedRecipe.description.slice(0, 70) + "..."
                        : mostLikedRecipe.description}
                    </p>
                  </div>
                ) : (
                  <div className="recipe-description empty">
                    <img src={DefaultPic} alt="no-recipe" />
                    <p className="recipe-name">No recipes yet</p>
                    <p className="recipe-details">
                      Share a recipe to see it here.
                    </p>
                  </div>
                )}
              </div>

              <div className="cooking-streak">
                <p>Cooking Streak</p>
                <div className="cooking-streak-content">
                  <img src={StreakIcon} alt="streak-icon" />
                  {user && (
                    <p>
                      You’ve shared/liked recipes for {user.cookingStreak} days
                      in a row.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
