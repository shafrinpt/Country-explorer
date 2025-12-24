import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { FaRegHeart } from "react-icons/fa";

import CountryList from "./pages/CountryList";
import CountryDetails from "./pages/CountryDetails";
import Favorites from "./pages/Favorites";
import {
  FavoritesProvider,
  FavoritesContext,
} from "./context/FavoritesContext";
import "./index.css";

/* ================= NAVBAR ================= */
const Navbar = () => {
  const { favorites } = useContext(FavoritesContext);

  // 🌙 Load saved theme
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.body.classList.add("dark");
    }
  }, []);

  // 🌗 Toggle dark / light
  const toggleTheme = () => {
    document.body.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      document.body.classList.contains("dark") ? "dark" : "light"
    );
  };

  return (
    <nav className="navbar">
      <h2>🌍 Country Explorer</h2>

      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <Link to="/">Home</Link>

        {/* 🤍 Outline Heart (Red Border Style) */}
        <Link
  to="/favorites"
  style={{
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    color: "white",
  }}
>
  <FaRegHeart size={20} />

  {favorites.length > 0 && (
    <span
      style={{
        position: "absolute",
        top: "-6px",
        right: "-8px",
        background: "red",
        color: "white",
        borderRadius: "50%",
        padding: "2px 6px",
        fontSize: "10px",
        fontWeight: "bold",
        lineHeight: "1",
      }}
    >
      {favorites.length}
    </span>
  )}
</Link>


        {/* 🌗 Theme Toggle */}
        <button
          onClick={toggleTheme}
          style={{
            padding: "6px 10px",
            borderRadius: "4px",
            border: "none",
            cursor: "pointer",
          }}
        >
          🌓
        </button>
      </div>
    </nav>
  );
};

/* ================= APP ================= */
function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<CountryList />} />
          <Route path="/country/:code" element={<CountryDetails />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  );
}

export default App;
