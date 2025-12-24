import { useEffect, useState } from "react";
import { countriesApi } from "../services/api";
import CountryCard from "../components/CountryCard";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";

const ITEMS_PER_PAGE = 10;

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("All");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchCountries = async () => {
    try {
      const res = await countriesApi.get(
        "/all?fields=name,flags,capital,region,population,cca3"
      );
      setCountries(res.data);
    } catch (error) {
      console.error("Failed to fetch countries", error);
    } finally {
      setLoading(false);
    }
  };

  fetchCountries();
}, []);


  const filtered = countries.filter((c) => {
    const matchName = c.name.common
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchRegion = region === "All" || c.region === region;
    return matchName && matchRegion;
  });

  const start = (page - 1) * ITEMS_PER_PAGE;
  const visible = filtered.slice(start, start + ITEMS_PER_PAGE);

  if (loading) return <p className="center">Loading...</p>;

  return (
    <div className="container">
      <SearchBar value={search} onChange={setSearch} />
      <Filters selected={region} onChange={setRegion} />

      <div className="grid">
        {visible.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>
        <button
          disabled={start + ITEMS_PER_PAGE >= filtered.length}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CountryList;
