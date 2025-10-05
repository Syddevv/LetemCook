import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Logo from "../assets/Logo.png";
import "../styles/Profile.css";
import ProfilePic from "../assets/syd-ig-profile.jpg";
import Calendar from "../assets/Member Since.png";
import TotalLikes from "../assets/Total Likes.png";
import RecipesLiked from "../assets/Recipes Liked.png";
import RecipesShared from "../assets/Recipes Shared.png";
import MacAndCheese from "../assets/mac & cheese.jpg";
import StreakIcon from "../assets/Cooking Streak.png";

const Profile = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        navRef.current.classlist.add("transparent");
      } else {
        navRef.current.classlist.remove("transparent");
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

        <div className="profile-container">
          <div className="profile-header">
            <h1>Profile</h1>
            <p>Your cooking journey and achievements</p>
          </div>

          <div className="profile-cards-wrapper">
            <div className="profile-grid-1">
              {/* Profile Info */}
              <div className="profile-card profile-info">
                <img src={ProfilePic} alt="profile-pic" />
                <h3>@syduu</h3>
                <p>Home Cook & Recipe Enthusiast</p>
                <blockquote>
                  "Cooking is not just about convenience. It's about love."
                </blockquote>
              </div>

              {/* First row stats */}
              <div className="stats1">
                <div className="profile-card">
                  <h3>12</h3>
                  <p>Recipes Shared</p>
                  <img
                    src={RecipesShared}
                    alt="recipes-shared-icon"
                    className="icon"
                  />
                </div>
                <div className="profile-card">
                  <h3>24</h3>
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
                  <h3>8</h3>
                  <p>Recipes Liked</p>
                  <img
                    src={RecipesLiked}
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
                    <p>14</p>
                  </div>
                </div>

                <div className="recipe-description">
                  <img src={MacAndCheese} alt="recipe-img" />
                  <p className="recipe-name">Mac and Cheese</p>
                  <p className="recipe-details">
                    Fresh tomatoes, mozzarella, and basil on a crispy...
                  </p>
                </div>
              </div>
              <div className="cooking-streak">
                <p>Cooking Streak</p>
                <div className="cooking-streak-content">
                  <img src={StreakIcon} alt="streak-icon" />
                  <p>You’ve shared/liked recipes for 3 days in a row.</p>
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
