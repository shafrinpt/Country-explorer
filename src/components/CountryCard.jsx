import { Link } from "react-router-dom";

const CountryCard = ({ country }) => {
  return (
    <Link to={`/country/${country.cca3}`} className="card">
      <img src={country.flags.png} alt={country.name.common} />
      <h3>{country.name.common}</h3>
      <p>Capital: {country.capital?.[0]}</p>
      <p>Region: {country.region}</p>
      <p>Population: {country.population.toLocaleString()}</p>
    </Link>
  );
};

export default CountryCard;
