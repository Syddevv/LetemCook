import "../styles/Login.css";
import Logo from "../assets/Logo.png";
import Poster from "../assets/Chef-pana.png";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/authContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );
      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);
        navigate("/discover");
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        alert(error.response.data.message);
      } else {
        console.log(error.message);
      }
    }
  };

  return (
    <div>
      <NavBar />

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
