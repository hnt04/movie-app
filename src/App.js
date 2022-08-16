import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import ThemeProvider from "./auth/ThemeProvider";
import { AuthProvider } from "./auth/AuthContext";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;