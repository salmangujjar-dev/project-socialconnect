import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Profile from "./Views/Profile";
import Posts from "./Views/Posts";
import { theme } from "./Styles/Theme";
import { ThemeProvider } from "@mui/material";

const element = document.getElementById("root");

const root = ReactDOM.createRoot(element);

root.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);
