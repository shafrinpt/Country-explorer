import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useContext, useEffect } from "react";
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

  // 🌙 Load saved theme on app start
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.body.classList.add("dark");
    }
  }, []);

  // 🌗 Toggle dark/light mode
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

        <Link to="/favorites">
          Favorites
          <span
            style={{
              marginLeft: "6px",
              background: "red",
              color: "white",
              borderRadius: "50%",
              padding: "2px 7px",
              fontSize: "12px",
            }}
          >
            {favorites.length}
          </span>
        </Link>

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
