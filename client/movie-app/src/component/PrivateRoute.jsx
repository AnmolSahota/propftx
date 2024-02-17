import React from "react";
import { Route, Redirect, useNavigate, Navigate } from "react-router-dom";
function PrivateRoute({ children }) {
  const token = localStorage.getItem("Token") || "";
  let navigate = useNavigate();
  return token ? children : <Navigate to={"/"} />;
}

export default PrivateRoute;
