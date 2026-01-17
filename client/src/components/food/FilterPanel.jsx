import "./FilterPanel.css";

function FilterPanel({ areas, types, filters, setFilters }) {
  return (
    <div className="filter-panel">
      <select
        value={filters.area}
        onChange={(e) => setFilters({ ...filters, area: e.target.value })}
      >
        <option value="">All Areas</option>
        {areas.map(a => (
          <option key={a} value={a}>{a}</option>
        ))}
      </select>

      <select
        value={filters.type}
        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
      >
        <option value="">All Event Types</option>
        {types.map(t => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>

      <select
        value={filters.time}
        onChange={(e) => setFilters({ ...filters, time: e.target.value })}
      >
        <option value="">Any Time</option>
        <option value="morning">Morning</option>
        <option value="afternoon">Afternoon</option>
        <option value="evening">Evening</option>
      </select>
    </div>
  );
}

export default FilterPanel;
