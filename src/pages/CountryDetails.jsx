import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { countriesApi, weatherApi } from "../services/api";
import { FavoritesContext } from "../context/FavoritesContext";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;


const CountryDetails = () => {
  const { code } = useParams();

  const [country, setCountry] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { toggleFavorite } = useContext(FavoritesContext);

  useEffect(() => {
    let isMounted = true;

    const fetchCountryDetails = async () => {
      try {
        const res = await countriesApi.get(
          `/alpha/${code}?fields=name,flags,capital,region,subregion,population,languages,currencies,timezones,cca3`
        );

        const countryData = Array.isArray(res.data)
          ? res.data[0]
          : res.data;

        if (!isMounted) return;

        setCountry(countryData);

        const capital = countryData.capital?.[0];
        if (capital && API_KEY) {
          try {
            const weatherRes = await weatherApi.get(
              `/weather?q=${capital}&appid=${API_KEY}&units=metric`
            );
            if (isMounted) setWeather(weatherRes.data);
          } catch {
            console.warn("Weather not available");
          }
        }
      } catch (err) {
        console.error("Failed to load country details", err);
        if (isMounted) {
          setError("Unable to load country details. Please try again later.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCountryDetails();

    return () => {
      isMounted = false;
    };
  }, [code]);

  if (loading) return <p className="center">Loading country details...</p>;

  if (error)
    return (
      <div className="center">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );

  return (
    <div className="details">
      <img src={country.flags.png} alt={country.name.common} />
      <h1>{country.name.common}</h1>

      <p><strong>Capital:</strong> {country.capital?.[0]}</p>
      <p><strong>Region:</strong> {country.region}</p>
      <p><strong>Sub-region:</strong> {country.subregion}</p>
      <p><strong>Population:</strong> {country.population.toLocaleString()}</p>

      <p>
        <strong>Languages:</strong>{" "}
        {country.languages
          ? Object.values(country.languages).join(", ")
          : "N/A"}
      </p>

      <p>
        <strong>Currencies:</strong>{" "}
        {country.currencies
          ? Object.values(country.currencies).map(c => c.name).join(", ")
          : "N/A"}
      </p>

      <p>
        <strong>Time Zones:</strong> {country.timezones?.join(", ")}
      </p>

      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(country);
        }}
      >
        ❤️ Add to Favorites
      </button>

      {weather && (
        <div className="weather">
          <h3>Weather in {country.capital?.[0]}</h3>
          <p>🌡 {weather.main.temp} °C</p>
          <p>☁ {weather.weather[0].description}</p>
          <p>💧 {weather.main.humidity}%</p>
          <p>💨 {weather.wind.speed} km/h</p>
        </div>
      )}
    </div>
  );
};

export default CountryDetails;
