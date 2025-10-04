import "../styles/Register.css";
import Logo from "../assets/Logo.png";
import Poster from "../assets/Chef-pana.png";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";

const RegistrationPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div>
      <NavBar />

      <div className="registration-page">
        <div className="registration-wrapper">
          <div className="left-section">
            <div className="taglines-wrapper">
              <h1 className="tagline">
                Cooking <br />
                is better together
              </h1>
              <div className="sub-tagline">
                <hr className="sub-tag-hr" />
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
              <h1>Register</h1>
              <p>Please complete to create your account</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" required />
              </div>

              <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required />
              </div>

              <div>
                <label htmlFor="confirm-pass">Confirm Password</label>
                <input
                  type="password"
                  id="confirm-pass"
                  name="confirmPass"
                  required
                />
              </div>

              <button className="sign-up-button" type="submit">
                Sign Up
              </button>
            </form>

            <p className="link-to-login">
              Already have an account?{" "}
              <Link to="/login" style={{ textDecoration: "none" }}>
                <span className="link">Login</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
