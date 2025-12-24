const regions = ["All", "Asia", "Europe", "Africa", "Americas", "Oceania"];

const Filters = ({ selected, onChange }) => (
  <div className="filters">
    {regions.map((r) => (
      <button
        key={r}
        className={selected === r ? "active" : ""}
        onClick={() => onChange(r)}
      >
        {r}
      </button>
    ))}
  </div>
);

export default Filters;
