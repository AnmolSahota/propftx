import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Wishlist from "./Wishlist";
import Movies from "./Movies";
import PrivateRoute from "../component/PrivateRoute";

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/wishlist"
        element={
          <PrivateRoute>
            <Wishlist />
          </PrivateRoute>
        }
      />
      <Route
        path="/movies"
        element={
          <PrivateRoute>
            <Movies />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default MainRoutes;
