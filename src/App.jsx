import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useContext } from "react";
import CountryList from "./pages/CountryList";
import CountryDetails from "./pages/CountryDetails";
import Favorites from "./pages/Favorites";
import { FavoritesProvider, FavoritesContext } from "./context/FavoritesContext";
import "./index.css";

/* 🔹 Navbar separated to use Context */
const Navbar = () => {
  const { favorites } = useContext(FavoritesContext);

  return (
    <nav className="navbar">
      <h2>🌍 Country Explorer</h2>

      <div>
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
      </div>
    </nav>
  );
};

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
