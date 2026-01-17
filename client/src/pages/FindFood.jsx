import "./styles/FindFood.css";
import { useEffect, useState } from "react";
import FilterPanel from "../components/food/FilterPanel";
import FoodCard from "../components/food/FoodCard";
import EventDetails from "../components/events/EventDetails";
import MapView from "../components/map/MapView";
import { api } from "../utils/api";

function FindFood() {
  const [events, setEvents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // 🔍 LIVE SEARCH (like Navbar)
  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState({
    area: "",
    time: "",
    type: ""
  });

  // 🔹 LOAD ALL EVENTS
  useEffect(() => {
    const load = async () => {
      const data = await api.getEvents();
      setEvents(data);
      setFiltered([]); // empty by default
    };
    load();
  }, []);

  // 🔍 SEARCH + FILTER LOGIC (NAVBAR STYLE)
  useEffect(() => {
    if (
      !search.trim() &&
      !filters.area &&
      !filters.type &&
      !filters.time
    ) {
      setFiltered([]);
      return;
    }

    let result = [...events];

    // 🔍 TEXT SEARCH (same as Navbar)
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (e) =>
          e.title?.toLowerCase().includes(q) ||
          e.locationName?.toLowerCase().includes(q)
      );
    }

    // 📍 AREA
    if (filters.area) {
      result = result.filter(
        (e) => e.locationName === filters.area
      );
    }

    // 🏷 TYPE
    if (filters.type) {
      result = result.filter(
        (e) => e.eventType === filters.type
      );
    }

    // ⏰ TIME
    if (filters.time) {
      result = result.filter((e) => {
        if (!e.startTime) return false;
        const hour = Number(e.startTime.split(":")[0]);
        if (filters.time === "morning") return hour < 12;
        if (filters.time === "afternoon") return hour >= 12 && hour < 17;
        if (filters.time === "evening") return hour >= 17;
        return true;
      });
    }

    setFiltered(result);
  }, [search, filters, events]);

  const areas = [...new Set(events.map(e => e.locationName).filter(Boolean))];
  const types = [...new Set(events.map(e => e.eventType).filter(Boolean))];

  return (
    <div className="find-food-page">

      <div className="find-food-header">
        <h1>Find Free Food</h1>
        <p>Browse nearby locations serving free food</p>
      </div>

      {/* 🔍 SEARCH (LIVE) */}
      <div className="find-food-search">
        <input
          placeholder="Search event or location"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button>Search</button>
      </div>

      {/* FILTERS */}
      <FilterPanel
        areas={areas}
        types={types}
        filters={filters}
        setFilters={setFilters}
      />

      {/* EVENTS */}
      <div className="food-list">
        {filtered.length === 0 ? (
          <p style={{ textAlign: "center", width: "100%" }}>
            No events found
          </p>
        ) : (
          filtered.map(event => (
            <FoodCard
              key={event._id}
              data={event}
              onClick={() => setSelectedEvent(event)}
            />
          ))
        )}
      </div>

      {/* MAP */}
      <MapView events={filtered} />

      {/* DETAILS */}
      {selectedEvent && (
        <EventDetails
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
}

export default FindFood;
