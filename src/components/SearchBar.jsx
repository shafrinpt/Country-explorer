import { useEffect, useState } from "react";

const SearchBar = ({ onChange }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(value);
    }, 500); // ⏱ debounce 500ms

    return () => clearTimeout(timer);
  }, [value, onChange]);

  return (
    <div className="search-wrapper">
      <span className="search-icon">🔍</span>
      <input
        type="text"
        className="search"
        placeholder="Search country..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
