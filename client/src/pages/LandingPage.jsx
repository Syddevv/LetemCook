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
import { useEffect, useState, useLayoutEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const LandingPage = () => {
  const navigate = useNavigate();
  const [featuredRecipes, setFeaturedRecipes] = useState([]);

  useEffect(() => {
    const fetchFeaturedRecipes = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/recipes/featured`
        );
        setFeaturedRecipes(res.data.recipes);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchFeaturedRecipes();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <NavBar />

      {/* HERO SECTION */}
      <motion.div
        className="hero"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="right-hero-section">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Share Your
          </motion.h1>
          <motion.h1
            className="gradient-text"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Culinary
          </motion.h1>
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Creations
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Join a community of passionate home cooks.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Discover amazing recipes, share your masterpieces,
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            and let everyone cook together.
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
          >
            <button
              className="start-cooking-btn"
              onClick={() => navigate("/login")}
            >
              Start Cooking
              <img src={Arrow} alt="arrow" className="btn-arrow" />
            </button>
          </motion.div>
        </div>

        <motion.div
          className="left-hero-section"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <img src={Pasta} alt="Pasta" className="hero-poster" />
        </motion.div>
      </motion.div>

      {/* FEATURES SECTION */}
      <motion.div
        className="website-features"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="top-section">
          <h1>
            Everything You Need To <span>Cook & Share</span>
          </h1>
          <p>From discovering new flavors to sharing your signature dishes</p>
        </div>

        <div className="features-wrapper">
          {[
            {
              img: RecipeBook,
              title: "Discover Recipes",
              desc: "Browse thousands of recipes from professional chefs and food APIs",
            },
            {
              img: Heart,
              title: "Save Favorites",
              desc: "Keep all the recipes you love in one place.",
            },
            {
              img: Sharing,
              title: "Share Creations",
              desc: "Upload your own recipes with photos and detailed instructions",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              className="feature-card"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.2, duration: 0.6 }}
            >
              <div className="feature-icon">
                <img src={feature.img} alt={feature.title} />
              </div>
              <h1 className="feature-title">{feature.title}</h1>
              <p className="feature-subtitle">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* FEATURED RECIPES */}
      <motion.div
        className="featured-recipes"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="featured-recipes-title">
          <h1>
            Featured <span className="gradient-text">Community Recipes</span>
          </h1>
          <p>See what our amazing community is cooking up</p>
        </div>

        <div className="recipe-cards-wrapper">
          {featuredRecipes && featuredRecipes.length > 0 ? (
            featuredRecipes.map((recipe, index) => (
              <motion.div
                key={recipe._id}
                className="recipe-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  scale: 1.03,
                  y: -8,
                  transition: { duration: 0.15, ease: "easeOut" },
                }}
              >
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
                      by{" "}
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
              </motion.div>
            ))
          ) : (
            <p>There are no current featured recipes.</p>
          )}
        </div>
      </motion.div>

      {/* BOTTOM CTA */}
      <motion.div
        className="bottom-hero"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
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
      </motion.div>

      {/* FOOTER */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="footer-links">
          <p>© 2025 Let'em Cook. All rights reserved.</p>
          <p>Privacy</p>
          <p>Terms</p>
        </div>
      </motion.footer>
    </motion.div>
  );
};

export default LandingPage;
