import "../styles/Login.css";
import Logo from "../assets/Logo.png";
import Poster from "../assets/Chef-pana.png";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div>
      <nav>
        <div className="logo-name" onClick={() => navigate("/")}>
          <img src={Logo} alt="Logo" className="logo" />
          <p className="website-name">Let'em Cook</p>
        </div>

        <div className="nav-buttons">
          <button className="signIn-BTN" onClick={() => navigate("/login")}>
            Sign In
          </button>
          <button
            className="getStarted-BTN"
            onClick={() => navigate("/register")}
          >
            Get Started
          </button>
        </div>
      </nav>

      <div className="login-page">
        <div className="login-wrapper">
          <div className="left-section">
            <div className="taglines-wrapper">
              <h1 className="tagline">
                Cooking <br />
                is better together
              </h1>
              <div className="sub-tagline">
                <hr />
                <p>Join the table</p>
              </div>
            </div>

            <img className="poster" src={Poster} alt="Poster" />

            <div className="logo-name-registration">
              <img src={Logo} alt="Logo" className="logo2" />
              <p className="website-name2">Let'em Cook</p>
            </div>
          </div>

          <hr className="partition" />

          <div className="right-section">
            <div className="title">
              <h1>Login</h1>
              <p>Please enter your login details below</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" required />
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required />
              </div>

              <button className="sign-in-button" type="submit">
                Sign In
              </button>
            </form>

            <p className="link-to-login">
              Don't have an account?
              <Link to="/register" style={{ textDecoration: "none" }}>
                <span className="link">Register</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
