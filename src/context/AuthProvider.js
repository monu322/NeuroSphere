import React, { createContext, useEffect, useState } from "react";
import { auth } from "../config/fire-config";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

// const defaultAuthInfo = { isLoggedIn: false, roleAs: "user" };

const AuthProvider = ({ children }) => {
  const [roleInfo, setRoleInfo] = useState("user");
  const [user, setUser] = useState(null);

  const handleLogin = (role) => {
    if (role === "user") {
      setRoleInfo(role);
    } else {
      setRoleInfo(role);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
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
