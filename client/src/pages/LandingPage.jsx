import Logo from "../assets/Logo.png";
import "../styles/LandingPage.css";
import Pasta from "../assets/pasta.jpg";
import Arrow from "../assets/white arrow.png";
import RecipeBook from "../assets/recipe-book.png";
import Heart from "../assets/Recipes Liked.png";
import Sharing from "../assets/sharing.png";
import Clock from "../assets/clock.png";
import ServingIcon from "../assets/Serving Icon.png";

const LandingPage = () => {
  return (
    <div>
      <nav>
        <div className="logo-name">
          <img src={Logo} alt="Logo" className="logo" />
          <p className="website-name">Let'em Cook</p>
        </div>

        <div className="nav-buttons">
          <button className="signIn-BTN">Sign In</button>
          <button className="getStarted-BTN">Get Started</button>
        </div>
      </nav>

      <div className="hero">
        <div className="right-hero-section">
          <h1>Share Your</h1>
          <h1 className="gradient-text">Culinary</h1>
          <h1>Creations</h1>

          <p>Join a community of passionate home cooks. </p>
          <p>Discover amazing recipes, share your masterpieces,</p>
          <p>and let everyone cook together.</p>

          <div className="hero-buttons">
            <button className="start-cooking-btn">
              Start Cooking
              <img src={Arrow} alt="arrow" className="btn-arrow" />
            </button>
            <button className="browse-recipes-btn">Browse Recipes</button>
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
          <div className="recipe-card">
            <div className="like-count">
              <img src={Heart} alt="heart" />
              <p>23</p>
            </div>
            <img src={Pasta} alt="Pasta" className="recipe-image" />

            <div className="recipe-details-wrapper">
              <div className="recipe-content">
                <h3 className="recipe-title">Classic Pasta Carbonara</h3>
                <p className="recipe-owner">by Sarah Chen</p>
                <p className="recipe-details">
                  Fresh tomatoes, mozzarella, and basil on a crispy...
                </p>

                <div className="time-serving">
                  <div className="cooking-time">
                    <img src={Clock} alt="Clock" />
                    <p>25 mins</p>
                  </div>

                  <div className="serving-count">
                    <img src={ServingIcon} alt="Serving" />
                    <p>2 servings</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="recipe-card">
            <div className="like-count">
              <img src={Heart} alt="heart" />
              <p>23</p>
            </div>
            <img src={Pasta} alt="Pasta" className="recipe-image" />

            <div className="recipe-details-wrapper">
              <div className="recipe-content">
                <h3 className="recipe-title">Classic Pasta Carbonara</h3>
                <p className="recipe-owner">by Sarah Chen</p>
                <p className="recipe-details">
                  Fresh tomatoes, mozzarella, and basil on a crispy...
                </p>

                <div className="time-serving">
                  <div className="cooking-time">
                    <img src={Clock} alt="Clock" />
                    <p>25 mins</p>
                  </div>

                  <div className="serving-count">
                    <img src={ServingIcon} alt="Serving" />
                    <p>2 servings</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="recipe-card">
            <div className="like-count">
              <img src={Heart} alt="heart" />
              <p>23</p>
            </div>
            <img src={Pasta} alt="Pasta" className="recipe-image" />

            <div className="recipe-details-wrapper">
              <div className="recipe-content">
                <h3 className="recipe-title">Classic Pasta Carbonara</h3>
                <p className="recipe-owner">by Sarah Chen</p>
                <p className="recipe-details">
                  Fresh tomatoes, mozzarella, and basil on a crispy...
                </p>

                <div className="time-serving">
                  <div className="cooking-time">
                    <img src={Clock} alt="Clock" />
                    <p>25 mins</p>
                  </div>

                  <div className="serving-count">
                    <img src={ServingIcon} alt="Serving" />
                    <p>2 servings</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bottom-hero">
        <h1>Ready to Start Your Culinary Journey?</h1>
        <p>
          Join thousands of home cooks sharing their passion for great food.
        </p>
        <p>Your next favorite recipe is just a click away!</p>
        <button className="createAccount-button">Create Account</button>
      </div>

      <footer>
        <div className="logo-name">
          <img src={Logo} alt="Logo" className="logo" />
          <p className="website-name">Let'em Cook</p>
        </div>

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
