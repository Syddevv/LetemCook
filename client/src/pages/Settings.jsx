import React, { useRef, useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Logo from "../assets/Logo.png";
import AccountIcon from "../assets/Account Settings.png";
import LockIcon from "../assets/Update Password.png";
import AppInfo from "../assets/App Information.png";
import "../styles/Settings.css";
import { useAuth } from "../context/authContext";
import DefaultPic from "../assets/default profile.png";
import axios from "axios";

const Settings = ({ collapsed, setCollapsed }) => {
  const fileInputRef = useRef();
  const { user } = useAuth();
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    cookingTitle: "",
    userBio: "",
    profilePicture: null,
  });

  const handleAccountChanges = (e) => {
    e.preventDefault();
    try {
      const { name, value, files } = e.target;
      setFormData({
        ...formData,
        [name]: files ? files[0] : value,
      });
    } catch (err) {
      console.err(err.message);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); // for preview
    }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    });

    if (imageFile) {
      data.append("profilePicture", imageFile);
    }

    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5000/api/auth/${user._id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Profile updated successfully!");
      refreshPage();
      setImageFile(null);
      setImagePreview(null);
      setFormData({
        username: "",
        email: "",
        cookingTitle: "",
        userBio: "",
        profilePicture: null,
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  const refreshPage = () => {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        cookingTitle: user.cookingTitle || "",
        userBio: user.userBio || "",
        profilePicture: user.profilePicture || null,
      });
    }
  }, [user]);

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
          <div className="settings-header">
            <h1>Settings</h1>
            <p>Manage your account settings</p>
          </div>

          <div className="settings-grids">
            <div className="settings-grid-1">
              <div className="account-settings-card">
                <p className="account-settings-header">
                  <img src={AccountIcon} alt="account-icon" />
                  Account Settings
                </p>

                <div className="account-settings-contents">
                  {user && (
                    <img
                      src={imagePreview || user?.profilePicture || DefaultPic}
                      alt="profile-picture"
                      style={{ marginBottom: "10px" }}
                    />
                  )}

                  <div className="fileUploadWrapper">
                    <input
                      type="file"
                      id="profilePicture"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                    <label
                      htmlFor="profilePicture"
                      className="update-photo-button"
                    >
                      Update Picture
                    </label>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className="account-settings-input"
                  >
                    <div>
                      <label htmlFor="username">Username</label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleAccountChanges}
                      />
                    </div>

                    <div>
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleAccountChanges}
                      />
                    </div>

                    <div>
                      <label htmlFor="cooking-title">Cooking Title</label>
                      <select
                        className="cooking-title"
                        name="cookingTitle"
                        value={formData.cookingTitle}
                        onChange={handleAccountChanges}
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
                        name="userBio"
                        onChange={handleAccountChanges}
                        value={formData.userBio}
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
    </div>
  );
};

export default Settings;
