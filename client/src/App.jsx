import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "../src/pages/LandingPage";
import RegistrationPage from "./pages/Register";
import LoginPage from "./pages/Login";
import DiscoverRecipes from "./pages/Discover.jsx";
import CommunityRecipes from "./pages/CommunityRecipes.jsx";
import MyRecipe from "./pages/MyRecipes.jsx";
import LikedRecipes from "./pages/LikedRecipes.jsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/discover" element={<DiscoverRecipes />} />
          <Route path="/community" element={<CommunityRecipes />} />
          <Route path="/my-recipes" element={<MyRecipe />} />
          <Route path="/liked-recipes" element={<LikedRecipes />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
