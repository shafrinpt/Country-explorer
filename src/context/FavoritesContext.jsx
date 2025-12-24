import { createContext, useEffect, useState } from "react";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (country) => {
    const exists = favorites.find((c) => c.cca3 === country.cca3);
    if (!exists) {
      setFavorites([...favorites, country]);
    }
  };

  const removeFavorite = (code) => {
    setFavorites(favorites.filter((c) => c.cca3 !== code));
  };

  const toggleFavorite = (country) => {
    const exists = favorites.find((c) => c.cca3 === country.cca3);
    exists ? removeFavorite(country.cca3) : addFavorite(country);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, toggleFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
