import { useContext, useState } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import Toast from "../components/Toast";

const Favorites = () => {
  const { favorites, removeFavorite } = useContext(FavoritesContext);
  const [toastMsg, setToastMsg] = useState("");

  const handleRemove = (code) => {
    console.log("Remove clicked"); // 🔍 debug
    removeFavorite(code);
    setToastMsg("❌ Removed from favorites");
  };

  if (!favorites || favorites.length === 0) {
    return <p className="center">No favorites added</p>;
  }

  return (
    <div className="container">
      <h2>❤️ Favorites ({favorites.length})</h2>

      <div className="grid">
        {favorites.map((country) => (
          <div key={country.cca3} className="card">
            <img src={country.flags.png} alt={country.name.common} />
            <h3>{country.name.common}</h3>

            <button
              onClick={() => handleRemove(country.cca3)}
              style={{
                marginTop: "10px",
                padding: "8px",
                background: "#d11a2a",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Remove from Favorites
            </button>
          </div>
        ))}
      </div>

      {/* 🔔 Toast */}
      {toastMsg && (
        <Toast
          message={toastMsg}
          onClose={() => setToastMsg("")}
        />
      )}
    </div>
  );
};

export default Favorites;
