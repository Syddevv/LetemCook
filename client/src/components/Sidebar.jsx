import { useNavigate, useLocation } from "react-router-dom";
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
import { useAuth } from "../context/authContext.js";

const navItems = [
  { label: "Discover Recipes", icon: DiscoverIcon, route: "/discover" },
  { label: "Community Recipes", icon: CommunityIcon, route: "/community" },
  { label: "My Recipes", icon: MyRecipesIcon, route: "/my-recipes" },
  { label: "Liked Recipes", icon: LikeRecipesIcon, route: "/liked-recipes" },
  { label: "Profile", icon: ProfileIcon, route: "/profile" },
  { label: "Settings", icon: SettingsIcon, route: "/settings" },
];

const Sidebar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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
          {user && <p className="profile-username">@{user.username}</p>}
          {user && <p className="profile-bio">{user.cookingTitle}</p>}
        </div>
      )}

      <ul className="navigations">
        {navItems.map((item) => (
          <li
            key={item.label}
            className={location.pathname === item.route ? "active" : ""}
            onClick={() => navigate(item.route)}
          >
            <img src={item.icon} alt={item.label} />
            {!collapsed && item.label}
          </li>
        ))}
        <li className="logout" onClick={handleLogout}>
          <img src={LogoutIcon} alt="Logout" />
          {!collapsed && "Logout"}
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
