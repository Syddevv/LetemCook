import "../styles/LandingPage.css";
import Pasta from "../assets/pasta.jpg";
import Arrow from "../assets/white arrow.png";
import RecipeBook from "../assets/recipe-book.png";
import Heart from "../assets/Recipes Liked.png";
import Sharing from "../assets/sharing.png";
import Clock from "../assets/clock.png";
import ServingIcon from "../assets/Serving Icon.png";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const LandingPage = () => {
  const navigate = useNavigate();
  const [featuredRecipes, setFeaturedRecipes] = useState([]);

  useEffect(() => {
    const fetchFeaturedRecipes = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/recipes/featured"
        );
        setFeaturedRecipes(res.data.recipes);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchFeaturedRecipes();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="hero">
        <div className="right-hero-section">
          <h1>Share Your</h1>
          <h1 className="gradient-text">Culinary</h1>
          <h1>Creations</h1>

          <p>Join a community of passionate home cooks. </p>
          <p>Discover amazing recipes, share your masterpieces,</p>
          <p>and let everyone cook together.</p>

          <div className="hero-buttons">
            <button
              className="start-cooking-btn"
              onClick={() => navigate("/login")}
            >
              Start Cooking
              <img src={Arrow} alt="arrow" className="btn-arrow" />
            </button>
          </div>
        </div>

        <div className="left-hero-section">
          <img src={Pasta} alt="Pasta" className="hero-poster" />
        </div>
      </div>

      <div className="website-features">
        <div className="top-section">
          <h1>
            Everything You Need To <span>Cook & Share</span>
          </h1>
          <p>From discovering new flavors to sharing your signature dishes</p>
        </div>

        <div className="features-wrapper">
          <div className="feature-card">
            <div className="feature-icon">
              <img src={RecipeBook} alt="recipe-book" />
            </div>

            <h1 className="feature-title">Discover Recipes</h1>
            <p className="feature-subtitle">
              Browse thousands of recipes from professional chefs and food APIs
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <img src={Heart} alt="heart-icon" />
            </div>

            <h1 className="feature-title">Save Favorites</h1>
            <p className="feature-subtitle">
              Keep all the recipes you love in one place.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <img src={Sharing} alt="sharing-icon" />
            </div>

            <h1 className="feature-title">Share Creations</h1>
            <p className="feature-subtitle">
              Upload your own recipes with photos and detailed instructions
            </p>
          </div>
        </div>
      </div>

      <div className="featured-recipes">
        <div className="featured-recipes-title">
          <h1>
            Featured <span className="gradient-text">Community Recipes</span>
          </h1>
          <p>See what our amazing community is cooking up</p>
        </div>

        <div className="recipe-cards-wrapper">
          {featuredRecipes && featuredRecipes.length > 0 ? (
            featuredRecipes.map((recipe) => (
              <div className="recipe-card" key={recipe._id}>
                <div className="like-count">
                  <img src={Heart} alt="heart" />
                  <p>{recipe.likes}</p>
                </div>

                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="recipe-image"
                />

                <div className="recipe-details-wrapper">
                  <div className="recipe-content">
                    <h3 className="recipe-title">{recipe.title}</h3>
                    <p className="recipe-owner">
                      by
                      <span style={{ fontWeight: "600" }}>
                        {recipe.user?.username}
                      </span>
                    </p>
                    <p className="recipe-details">
                      {recipe.description?.length > 80
                        ? recipe.description.slice(0, 55) + "..."
                        : recipe.description}
                    </p>

                    <div className="time-serving">
                      <div className="cooking-time">
                        <img src={Clock} alt="Clock" />
                        <p>{recipe.cookingTime}</p>
                      </div>

                      <div className="serving-count">
                        <img src={ServingIcon} alt="Serving" />
                        <p>{recipe.servings}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>There are no current featured recipes.</p>
          )}
        </div>
      </div>

      <div className="bottom-hero">
        <h1>Ready to Start Your Culinary Journey?</h1>
        <p>
          Join thousands of home cooks sharing their passion for great food.
        </p>
        <p>Your next favorite recipe is just a click away!</p>
        <button
          className="createAccount-button"
          onClick={() => navigate("/register")}
        >
          Create Account
        </button>
      </div>

      <footer>
        <div className="footer-links">
          <p>© 2025 Let'em Cook. All rights reserved.</p>
          <p>Privacy</p>
          <p>Terms</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
