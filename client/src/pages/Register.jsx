import "../styles/Register.css";
import Logo from "../assets/Logo.png";
import Poster from "../assets/Chef-pana.png";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const RegistrationPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [displayError, setDisplayError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPass) {
      setDisplayError("Password and Confirm password do not match.");
      return;
    }

    if (password.length < 8) {
      setDisplayError("Password must be at least 8 characters.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        { username, email, password }
      );

      if (response.data.success) {
        navigate("/login");
      }
    } catch (err) {
      setDisplayError(
        err.response?.data?.message || err.message || "Account creation failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <NavBar />

      <div className="registration-page">
        <div className="registration-wrapper">
          {/* LEFT SECTION */}
          <motion.div
            className="left-section"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="taglines-wrapper"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="tagline">
                Cooking <br />
                is better together
              </h1>
              <div className="sub-tagline">
                <hr className="sub-tag-hr" />
                <p>Join the table</p>
              </div>
            </motion.div>

            <motion.img
              className="poster"
              src={Poster}
              alt="Poster"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            />

            <motion.div
              className="logo-name-registration"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <img src={Logo} alt="Logo" className="logo2" />
              <p className="website-name2">Let'em Cook</p>
            </motion.div>
          </motion.div>

          <hr className="partition" />

          {/* RIGHT SECTION */}
          <motion.div
            className="right-section"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="title"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1>Register</h1>
              <p>Please complete to create your account</p>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="form-inputs"
            >
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

              {displayError && <p className="error">{displayError}</p>}

              <motion.button
                className="sign-up-button"
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
              >
                {loading ? <div className="spinner"></div> : "Sign Up"}
              </motion.button>
            </motion.form>

            <motion.p
              className="link-to-login"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Already have an account?{" "}
              <Link to="/login" style={{ textDecoration: "none" }}>
                <span className="link">Login</span>
              </Link>
            </motion.p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default RegistrationPage;
