import React, { useRef, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Logo from "../assets/Logo.png";
import "../styles/Profile.css";
import DefaultPic from "../assets/default profile.png";
import Calendar from "../assets/Member Since.png";
import TotalLikes from "../assets/Total Likes.png";
import RecipesLiked from "../assets/Recipes Liked.png";
import RecipesShared from "../assets/Recipes Shared.png";
import StreakIcon from "../assets/Cooking Streak.png";
import RecipeLogo from "../assets/recipe-book.png";
import { useAuth } from "../context/authContext";
import axios from "axios";
import { motion } from "framer-motion";

const Profile = ({ collapsed, setCollapsed }) => {
  const navRef = useRef(null);
  const { user, refreshUserProfile, creationDate } = useAuth();
  const [mostLikedRecipe, setMostLikedRecipe] = useState(null);

  const fetchMostLikedRecipe = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:5000/api/recipes/most-liked",
        {
          headers: { Authorization: `Bearer ${token}` },
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

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
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

        <div className="profile-container">
          <motion.div
            className="profile-header"
            variants={headerVariants}
            initial="hidden"
            animate="visible"
          >
            <h1>Profile</h1>
            <p>Your cooking journey and achievements</p>
          </motion.div>

          <div className="profile-cards-wrapper">
            <div className="profile-grid-1">
              {/* Profile Info */}
              <motion.div
                className="profile-card profile-info"
                custom={0}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.05 }}
                variants={cardVariants}
              >
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
              </motion.div>

              {/* First row stats */}
              <div className="stats1">
                {[
                  {
                    label: "Recipes Shared",
                    value: user?.recipesSharedTotal,
                    icon: RecipesShared,
                  },
                  {
                    label: "Total Likes",
                    value: user?.totalLikes,
                    icon: TotalLikes,
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="profile-card"
                    custom={index + 1}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ scale: 1.05, y: -5 }}
                    variants={cardVariants}
                  >
                    <h3>{stat.value ?? 0}</h3>
                    <p>{stat.label}</p>
                    <img src={stat.icon} alt={stat.label} className="icon" />
                  </motion.div>
                ))}
              </div>

              {/* Second row stats */}
              <div className="stats2">
                {[
                  {
                    label: "Recipes Liked",
                    value: user?.recipesLikedTotal,
                    icon: RecipesLiked,
                  },
                  {
                    label: "Member Since",
                    value: creationDate,
                    icon: Calendar,
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="profile-card"
                    custom={index + 3}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ scale: 1.05, y: -5 }}
                    variants={cardVariants}
                  >
                    <h3>{stat.value ?? 0}</h3>
                    <p>{stat.label}</p>
                    <img src={stat.icon} alt={stat.label} className="icon" />
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="profile-grid-2">
              <motion.div
                className="most-liked-recipe"
                custom={5}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.03 }}
                variants={cardVariants}
              >
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
                  <div className="no-recipes">
                    <div className="no-recipe-circle">
                      <img
                        src={RecipeLogo}
                        alt="heart icon"
                        className="no-recipe-icon"
                      />
                    </div>
                    <h3>No recipes yet.</h3>
                    <p>Share a recipe to see it here!</p>
                  </div>
                )}
              </motion.div>

              <motion.div
                className="cooking-streak"
                custom={6}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.03 }}
                variants={cardVariants}
              >
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
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
