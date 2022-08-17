import * as React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Layout from "../layout/Layout";
import HomePage from "../page/HomePage";
import Discovery from "../page/Discovery";
import Form from "../page/Form";
import MovieDetail from "../page/MovieDetail";
import FavoritePage from "../page/Favorite";
import PageNotFound from "../page/PageNotFound";
import { useAuth } from "../auth/AuthContext";
import LogInForm from "../components/LogInForm";

function Router() {
  let location = useLocation();
  let state = location.state;
  function RequireAuth({ children }) {
    let auth = useAuth();
    console.log("user status:", auth.user);
    if (!auth.user) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
  }
  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="discovery/:pageId" element={<Discovery />} />
          <Route path="/movie/:movieId" element={<MovieDetail />} />
          <Route path="/login" element={<LogInForm />} />
          <Route path="*" element={<PageNotFound />} />
          <Route
            path="/favorite"
            element={
              <RequireAuth>
                <FavoritePage />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/login" element={<Form />} />
        </Routes>
      )}
    </>
  );
}

export default Router;