import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Import pages
import Login, { LOGIN_PATH } from "./pages/Login";
import Dashboard, { dashboardPath } from "./pages/DashBoard";

// Import actions
import { validateTokenRequest } from "./redux/actions/authActions";

const LoadingScreen = () => (
  <div style={{ textAlign: "center", marginTop: "20%" }}>
    <h2>Loading...</h2>
  </div>
);

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  console.log("isAuthenticated, loading", isAuthenticated, loading);

  if (loading.validateToken) return <LoadingScreen />; // ⬅️ Tampilkan loading saat validasi berjalan

  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(validateTokenRequest());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={LOGIN_PATH} element={<Login />} />
        <Route
          path={dashboardPath}
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* <Route path="/" element={<Navigate to="/login" />} />s */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
