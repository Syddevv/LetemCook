import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";

const NavBar = () => {
  const navRef = useRef(null);
  const navigate = useNavigate();

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
    </div>
  );
};
export default NavBar;
