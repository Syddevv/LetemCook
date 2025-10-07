import "../styles/Register.css";
import Logo from "../assets/Logo.png";
import Poster from "../assets/Chef-pana.png";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegistrationPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password != confirmPass) {
      console.log("Password must be the same.");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/register",
          { username, email, password }
        );

        if (response.data.success) {
          console.log("User registered successfully");
          navigate("/login");
        }
      } catch (error) {
        console.error(error.message);
      }
    }
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
                <input
                  type="text"
                  id="username"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="confirm-pass">Confirm Password</label>
                <input
                  type="password"
                  id="confirm-pass"
                  onChange={(e) => setConfirmPass(e.target.value)}
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
