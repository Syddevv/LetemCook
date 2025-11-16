import { useNavigate, useLocation } from "react-router-dom";
import Profilepic from "../assets/syd-ig-profile.jpg";
import DiscoverIcon from "../assets/Discover Recipes.png";
import CommunityIcon from "../assets/Community Recipes.png";
import MyRecipesIcon from "../assets/My Recipes.png";
import LikeRecipesIcon from "../assets/Liked Recipes.png";
import ProfileIcon from "../assets/Profile.png";
import SettingsIcon from "../assets/Settings.png";
import LogoutIcon from "../assets/logout.png";
import CollapseOpen from "../assets/open-mobile-sidebar-icon.png";
import CollapseClose from "../assets/collapse-mobile-sidebar-icon.png";
import "../styles/Sidebar.css";
import { useAuth } from "../context/authContext.js";
import DefaultPic from "../assets/default profile.png";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { motion } from "framer-motion";

const navItems = [
  { label: "Discover Recipes", icon: DiscoverIcon, route: "/discover" },
  { label: "Community Recipes", icon: CommunityIcon, route: "/community" },
  { label: "My Recipes", icon: MyRecipesIcon, route: "/my-recipes" },
  { label: "Liked Recipes", icon: LikeRecipesIcon, route: "/liked-recipes" },
  { label: "Profile", icon: ProfileIcon, route: "/profile" },
  { label: "Settings", icon: SettingsIcon, route: "/settings" },
];

const Sidebar = ({
  collapsed,
  setCollapsed,
  isMobile,
  isMobileSidebarOpen,
  toggleMobileSidebar,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const MySwal = withReactContent(Swal);

  const handleLogout = () => {
    MySwal.fire({
      title: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate("/login");
        MySwal.fire("Logged out!", "You have been logged out.", "success");
      }
    });
  };

  const sidebarClasses = `sidebar-wrapper ${
    isMobile ? "mobile" : collapsed ? "collapsed" : ""
  } ${isMobile && isMobileSidebarOpen ? "mobile-open" : ""}`;

  return (
    <aside className={sidebarClasses}>
      {isMobile ? (
        <div className="mobile-sidebar-header">
          <button
            className="mobile-close-btn"
            onClick={toggleMobileSidebar}
            aria-label="Close sidebar"
          >
            <img src={CollapseClose} alt="Close" />
          </button>
        </div>
      ) : (
        <button
          className="collapse-btn"
          onClick={() => setCollapsed((prev) => !prev)}
          aria-label="Toggle sidebar"
        >
          {collapsed ? <img src={CollapseOpen} /> : <img src={CollapseClose} />}
        </button>
      )}

      {/* --- 
      FIXED LOGIC HERE: 
      Show if: (NOT mobile AND NOT collapsed) OR (IS mobile)
      --- */}
      {((!isMobile && !collapsed) || isMobile) && (
        <div className="profile-wrapper">
          {user && (
            <img
              src={user.profilePicture ? user.profilePicture : DefaultPic}
              alt="profile-picture"
              className="profile-pic"
            />
          )}
          {user && <p className="profile-username">@{user.username}</p>}
          {user && <p className="profile-bio">{user.cookingTitle}</p>}
        </div>
      )}

      {/* NAVIGATIONS */}
      <motion.ul
        className="navigations"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.05,
            },
          },
        }}
      >
        {navItems.map((item, index) => (
          <motion.li
            key={item.label}
            className={location.pathname === item.route ? "active" : ""}
            onClick={() => navigate(item.route)}
            variants={{
              hidden: { x: -20, opacity: 0 },
              visible: {
                x: 0,
                opacity: 1,
                transition: { type: "spring", stiffness: 400, damping: 25 },
              },
            }}
            whileHover={{ x: 5, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <img src={item.icon} alt={item.label} />
            {(!collapsed || isMobile) && item.label}
          </motion.li>
        ))}

        {/* LOG OUT */}
        <motion.li
          className="logout"
          onClick={handleLogout}
          variants={{
            hidden: { x: -20, opacity: 0 },
            visible: {
              x: 0,
              opacity: 1,
              transition: { type: "spring", stiffness: 400, damping: 25 },
            },
          }}
          whileHover={{ x: 5, scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <img src={LogoutIcon} alt="Logout" />
          {(!collapsed || isMobile) && "Logout"}
        </motion.li>
      </motion.ul>
    </aside>
  );
};

export default Sidebar;
