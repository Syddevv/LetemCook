import React, { useEffect, useState } from "react";
import axios from "axios";

import { AuthContext } from "./authContext.js";

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const login = (user) => {
    setUser(user);
  };

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/verify", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (res.data.success) {
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.log(error);
      }
    };
    verifyUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const refreshUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (data) {
        setUser(data);
      }
    } catch (err) {
      console.error("Error refreshing user profile:", err);
    }
  };

  const creationDate = user
    ? new Date(user.createdAt).toLocaleDateString()
    : "";

  useEffect(() => {
    refreshUserProfile();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        refreshUserProfile,
        creationDate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default ContextProvider;
