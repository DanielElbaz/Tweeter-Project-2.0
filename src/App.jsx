// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar.jsx";
import Home from "./Pages/Home.jsx";
import Profile from "./Pages/Profile.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/Tweeter-Project-2.0/" element={<Home />} />
        <Route path="/Tweeter-Project-2.0/profile" element={<Profile />} />
      </Routes>
    </>
  );
}
