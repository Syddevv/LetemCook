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
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { motion } from "framer-motion";

const Settings = ({ collapsed, setCollapsed }) => {
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
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const MySwal = withReactContent(Swal);

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
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    const result = await MySwal.fire({
      title: "Change your password?",
      text: "Your password will be updated. Make sure you remember the new password.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, change it",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#d33",
    });

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("Please fill all fields.");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirm password do not match.");
      return;
    }

    if (result.isConfirmed) {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        await axios.put(
          `http://localhost:5000/api/auth/${user._id}/password`,
          { currentPassword, newPassword },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        MySwal.fire(
          "Success!",
          "Your password has been updated.",
          "success"
        ).then(() => {
          refreshPage();
        });
      } catch (err) {
        setPasswordError(
          err.response?.data?.message || err.message || "Password update failed"
        );
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await MySwal.fire({
      title: "Save changes to your profile?",
      text: "Your updated information will be saved and applied to your account.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, save changes",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#d33",
    });
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    });

    if (imageFile) {
      data.append("profilePicture", imageFile);
    }

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("token");
        await axios.put(`http://localhost:5000/api/auth/${user._id}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        MySwal.fire("Saved!", "Your profile has been updated.", "success").then(
          () => {
            refreshPage();
          }
        );
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
    }
  };

  const refreshPage = () => {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  setTimeout(() => {
    setPasswordError("");
  }, 2000);

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

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
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
        {/* HEADER */}
        <motion.div
          className="header"
          style={{
            left: collapsed ? "70px" : "340px",
            right: 0,
            transition: "left 0.3s",
          }}
          variants={headerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="logo-webName">
            <img src={Logo} alt="Logo" className="web-logo" />
            <p className="web-name">Let'em Cook</p>
          </div>
        </motion.div>

        <div className="settings-cards">
          <motion.div
            className="profile-header"
            style={{ paddingLeft: "10px" }}
            variants={headerVariants}
            initial="hidden"
            animate="visible"
          >
            <h1>Settings</h1>
            <p>Manage your account settings</p>
          </motion.div>

          <div className="settings-grids">
            {/* Grid 1 - Account Settings */}
            <motion.div
              className="settings-grid-1"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
              }}
            >
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
            </motion.div>

            {/* Grid 2 - Password & App Info */}
            <motion.div
              className="settings-grid-2"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.15,
                ease: "easeOut",
              }}
            >
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
                      placeholder="Your current password"
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="new-password">New Password</label>
                    <input
                      type="password"
                      id="new-password"
                      placeholder="Create new password"
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                      type="password"
                      id="confirm-password"
                      placeholder="Confirm your new password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>

                  {passwordError && <p className="error">{passwordError}</p>}
                  <button
                    type="submit"
                    className="save-password-button"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save Password"}
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
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
