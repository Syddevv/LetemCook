import React, { useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import Logo from "../assets/Logo.png";
import AccountIcon from "../assets/Account Settings.png";
import LockIcon from "../assets/Update Password.png";
import ProfilePic from "../assets/syd-ig-profile.jpg";
import AppInfo from "../assets/App Information.png";
import "../styles/Settings.css";
import { useAuth } from "../context/authContext";

const Settings = ({ collapsed, setCollapsed }) => {
  const [cookingTitle, setCookingTitle] = useState("Home Cook");
  const fileInputRef = useRef(null);
  const { user } = useAuth();

  const handleAccountChanges = (e) => {
    e.preventDefault();
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file);
    }
  };

  return (
    <div className="page-wrapper">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div
        className="page-wrapper-content"
        style={{
          marginLeft: collapsed ? "70px" : "340px",
          transition: "margin-left 0.3s",
        }}
      >
        <div
          className="header"
          style={{
            left: collapsed ? "70px" : "340px",
            right: 0,
            transition: "left 0.3s",
          }}
        >
          <div className="logo-webName">
            <img src={Logo} alt="Logo" className="web-logo" />
            <p className="web-name">Let'em Cook</p>
          </div>
        </div>

        <div className="settings-cards">
          <div className="settings-grid-1">
            <div className="account-settings-card">
              <p className="account-settings-header">
                <img src={AccountIcon} alt="account-icon" />
                Account Settings
              </p>

              <div className="account-settings-contents">
                <img src={ProfilePic} alt="profile-pic" />

                <div>
                  <button
                    className="update-photo-button"
                    type="button"
                    onClick={handleButtonClick}
                  >
                    Change Photo
                  </button>

                  {/* Hidden file input */}
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </div>

                <form
                  onSubmit={handleAccountChanges}
                  className="account-settings-input"
                >
                  <div>
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      placeholder={user ? `@${user.username}` : ""}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder={user ? `${user.email}` : ""}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="cooking-title">Cooking Title</label>
                    <select
                      className="cooking-title"
                      id="cooking-title"
                      value={cookingTitle}
                      onChange={(e) => setCookingTitle(e.target.value)}
                    >
                      <option value="Home Cook">Home Cook</option>
                      <option value="Recipe Enthusiast">
                        Recipe Enthusiast
                      </option>
                      <option value="Food Blogger">Food Blogger</option>
                      <option value="Professional Chef">
                        Professional Chef
                      </option>
                      <option value="Baking Lover">Baking Lover</option>
                      <option value="Grill Master">Grill Master</option>
                      <option value="Healthy Eater">Healthy Eater</option>
                      <option value="Experimental Cook">
                        Experimental Cook
                      </option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="bio">Bio</label>
                    <textarea
                      id="bio"
                      className="bio"
                      placeholder={
                        user?.userBio
                          ? `${user.userBio}`
                          : "Tell us your cooking journey"
                      }
                    ></textarea>
                  </div>

                  <button className="save-changes-button" type="submit">
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="settings-grid-2">
            <div className="update-password-card">
              <p className="update-password-card-header">
                <img src={LockIcon} alt="lock-icon" />
                Update Password
              </p>

              <form
                onSubmit={handleChangePassword}
                className="update-password-input"
              >
                <div>
                  <label htmlFor="current-password">Current Password</label>
                  <input
                    type="password"
                    id="current-password"
                    name="current-password"
                    placeholder="Your current password"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="new-password">New Password</label>
                  <input
                    type="password"
                    id="new-password"
                    name="new-password"
                    placeholder="Create current password"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="confirm-password">Confirm Password</label>
                  <input
                    type="password"
                    id="confirm-password"
                    name="confirm-password"
                    placeholder="Confirm your new password"
                    required
                  />
                </div>

                <button type="submit" className="save-password-button">
                  Save Password
                </button>
              </form>
            </div>

            <div className="app-information-card">
              <p className="app-information-card-header">
                <img src={AppInfo} alt="app-info-icon" />
                App Information
              </p>

              <div className="app-information-card-content">
                <div className="version">
                  <p className="version-label">Version</p>
                  <p className="version-number">1.0.0</p>
                </div>

                <div className="update">
                  <p className="update-label">Last Updated</p>
                  <p className="update-date">Today</p>
                </div>

                <hr className="app-info-hr" />
                <button className="privacy-policy">Privacy Policy</button>
                <button className="terms-of-service">Terms of Service</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
