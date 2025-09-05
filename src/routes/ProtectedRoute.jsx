// src/routes/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux"; // أو أي state manager/Context تستعمله

const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated } = useSelector((state) => state.auth); 
const isAuthenticated = true;  // for test
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
