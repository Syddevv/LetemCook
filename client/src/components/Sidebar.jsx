import React from "react";
import Profilepic from "../assets/syd-ig-profile.jpg";
import DiscoverIcon from "../assets/Discover Recipes.png";
import CommunityIcon from "../assets/Community Recipes.png";
import MyRecipesIcon from "../assets/My Recipes.png";
import LikeRecipesIcon from "../assets/Liked Recipes.png";
import ProfileIcon from "../assets/Profile.png";
import SettingsIcon from "../assets/Settings.png";
import LogoutIcon from "../assets/logout.png";
import CollapseOpen from "../assets/open-sidebar.png";
import CollapseClose from "../assets/close-sidebar.png";
import "../styles/Sidebar.css";

const Sidebar = ({ collapsed, setCollapsed }) => {
  return (
    <aside className={`sidebar-wrapper${collapsed ? " collapsed" : ""}`}>
      <button
        className="collapse-btn"
        onClick={() => setCollapsed((prev) => !prev)}
        aria-label="Toggle sidebar"
      >
        {collapsed ? <img src={CollapseOpen} /> : <img src={CollapseClose} />}
      </button>

      {!collapsed && (
        <div className="profile-wrapper">
          <img src={Profilepic} alt="profile-picture" className="profile-pic" />
          <p className="profile-username">@syduu</p>
          <p className="profile-bio">Home Cook & Recipe Enthusiast</p>
        </div>
      )}

      <ul className="navigations">
        <li className="active">
          <img src={DiscoverIcon} alt="Discover Recipes" />
          {!collapsed && "Discover Recipes"}
        </li>
        <li>
          <img src={CommunityIcon} alt="Community Recipes" />
          {!collapsed && "Community Recipes"}
        </li>
        <li>
          <img src={MyRecipesIcon} alt="My Recipes" />
          {!collapsed && "My Recipes"}
        </li>
        <li>
          <img src={LikeRecipesIcon} alt="Liked Recipes" />
          {!collapsed && "Liked Recipes"}
        </li>
        <li>
          <img src={ProfileIcon} alt="Profile" />
          {!collapsed && "Profile"}
        </li>
        <li>
          <img src={SettingsIcon} alt="Settings" />
          {!collapsed && "Settings"}
        </li>
        <li className="logout">
          <img src={LogoutIcon} alt="Logout" />
          {!collapsed && "Logout"}
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
