import React, { useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./authContext.js";

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 1. Define the Base URL dynamically
  const apiUrl = import.meta.env.VITE_API_URL;

  const login = (user) => {
    setUser(user);
  };

  useEffect(() => {
    const verifyUser = async () => {
      try {
        // 2. Use apiUrl instead of localhost
        const res = await axios.get(`${apiUrl}/api/auth/verify`, {
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
        // If verification fails (e.g. 401), ensure user is null
        setUser(null);
      }
    };
    verifyUser();
  }, [apiUrl]); // Added dependency

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const refreshUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      // 3. Use apiUrl here as well
      const res = await fetch(`${apiUrl}/api/auth/profile`, {
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
