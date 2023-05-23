import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./Views/Login";
import Singup from "./Views/Signup";
import MyPosts from "./Views/MyPosts";

const element = document.getElementById("root");

const root = ReactDOM.createRoot(element);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Singup />} />
      <Route path="/posts" element={<MyPosts />} />
    </Routes>
  </BrowserRouter>
);
