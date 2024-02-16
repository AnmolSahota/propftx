import React from 'react'
import { Route, Routes } from "react-router-dom";
import Login from './Login';
import Register from './Register';
import Wishlist from './Wishlist';
import Movies from './Movies';

function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/movies" element={<Movies />} />
        </Routes>)
}

export default MainRoutes