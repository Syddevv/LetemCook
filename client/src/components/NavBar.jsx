import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../assets/Logo.png";
import "../styles/NavBar.css";

const NavBar = () => {
  const navRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        navRef.current.classList.add("transparent");
      } else {
        navRef.current.classList.remove("transparent");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <nav ref={navRef}>
        <div className="logo-name">
          <img src={Logo} alt="Logo" className="logo" />
          <p className="website-name" onClick={() => navigate("/")}>
            Let'em Cook
          </p>
        </div>

        {!isAuthPage && (
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
        )}

        {/* Hamburger */}
        {!isAuthPage && (
          <div
            className={`hamburger ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}

        {/* Mobile Menu */}
        <div className={`mobile-menu ${menuOpen ? "show" : ""}`}>
          <button
            className="signIn-BTN"
            onClick={() => {
              setMenuOpen(false);
              navigate("/login");
            }}
          >
            Sign In
          </button>
          <button
            className="getStarted-BTN"
            onClick={() => {
              setMenuOpen(false);
              navigate("/register");
            }}
          >
            Get Started
          </button>
        </div>
      </nav>
    </div>
  );
};
export default NavBar;
