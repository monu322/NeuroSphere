import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const defaultAuthInfo = { isLoggedIn: false, roleAs: "user" };

const AuthProvider = ({ children }) => {
  const [authInfo, setAuthInfo] = useState({ ...defaultAuthInfo });
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
