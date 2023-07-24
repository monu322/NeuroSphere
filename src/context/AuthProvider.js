import React, { createContext, useEffect, useState } from "react";
import { auth } from "../config/fire-config";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

// const defaultAuthInfo = { isLoggedIn: false, roleAs: "user" };

const AuthProvider = ({ children }) => {
  const [roleInfo, setRoleInfo] = useState("");
  const [user, setUser] = useState(null);

  const handleLogin = (role) => {
    setRoleInfo(role);
    localStorage.setItem("roleAs", role);
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      let role = localStorage.getItem("roleAs");
      setRoleInfo(role);
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        setRoleInfo("");
        localStorage.removeItem("roleAs");
      }
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <AuthContext.Provider value={{ roleInfo, user, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
