import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MoviesProvider } from "./context/MoviesContext.tsx";
import MovieDetails from "./components/pages/MovieDetails.tsx";
import Navbar from "./components/Navbar.tsx";
import "./styles/styles.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <MoviesProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </MoviesProvider>
    </BrowserRouter>
  </React.StrictMode>
);
