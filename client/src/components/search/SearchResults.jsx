
import EventCard from "../events/EventCard";
import EventDetails from "../events/EventDetails";
import "./SearchResults.css";
import { useState } from "react";

export default function SearchResults({ results, onClose }) {
  const [selectedEvent, setSelectedEvent] = useState(null);

  if (!results.length) return null;

  return (
    <>
      <div className="search-overlay" onClick={onClose} />

      <div className="search-results">
        <h4>Search Results</h4>

        <div className="search-grid">
          {results.map(event => (
            <EventCard
              key={event._id}
              event={event}
              onClick={() => setSelectedEvent(event)}
            />
          ))}
        </div>
      </div>

      {selectedEvent && (
        <EventDetails
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </>
  );
}

