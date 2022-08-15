import React, { useState, useContext, createContext } from "react";

const AuthContextType = {
  user: "",
  signIn: null,
  signOut: null,
};
const AuthContext = createContext(AuthContextType);

export function AuthProvider({ children }) {
  let [user, setUser] = useState("");
  let signIn = (newUser, callback) => {
    setUser(newUser);
    callback();
  };
  let signOut = (callback) => {
    setUser(null);
    callback();
  };

  let value = { user, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}