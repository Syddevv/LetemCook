import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import LandingPage from "../src/pages/LandingPage";
import RegistrationPage from "./pages/Register";
import LoginPage from "./pages/Login";
import DiscoverRecipes from "./pages/Discover.jsx";
import CommunityRecipes from "./pages/CommunityRecipes.jsx";
import MyRecipe from "./pages/MyRecipes.jsx";
import LikedRecipes from "./pages/LikedRecipes.jsx";
import Profile from "./pages/Profile.jsx";
import Settings from "./pages/Settings.jsx";
import RecipeDetails from "./pages/RecipeDetails.jsx";
import EditRecipe from "./pages/EditRecipe.jsx";
import ProtectedRoute from "./components/ProtectedRoutes.jsx";

function App() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route element={<ProtectedRoute />}>
            <Route
              path="/discover"
              element={
                <DiscoverRecipes
                  collapsed={collapsed}
                  setCollapsed={setCollapsed}
                />
              }
            />
            <Route
              path="/community"
              element={
                <CommunityRecipes
                  collapsed={collapsed}
                  setCollapsed={setCollapsed}
                />
              }
            />
            <Route
              path="/my-recipes"
              element={
                <MyRecipe collapsed={collapsed} setCollapsed={setCollapsed} />
              }
            />
            <Route
              path="/liked-recipes"
              element={
                <LikedRecipes
                  collapsed={collapsed}
                  setCollapsed={setCollapsed}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile collapsed={collapsed} setCollapsed={setCollapsed} />
              }
            />
            <Route
              path="/settings"
              element={
                <Settings collapsed={collapsed} setCollapsed={setCollapsed} />
              }
            />
            <Route
              path="/recipe-details/:id"
              element={
                <RecipeDetails
                  collapsed={collapsed}
                  setCollapsed={setCollapsed}
                />
              }
            />
            <Route
              path="/edit-recipe/:id"
              element={
                <EditRecipe collapsed={collapsed} setCollapsed={setCollapsed} />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
