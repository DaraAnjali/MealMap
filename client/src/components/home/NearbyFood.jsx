import "./NearbyFood.css";
import { useEffect, useState } from "react";
import EventCard from "../events/EventCard";
import EventDetails from "../events/EventDetails";

function NearbyFood({ events }) {
  const [todayEvents, setTodayEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    if (!events?.length) return;

    const today = new Date().toDateString();

    const filtered = events.filter((event) => {
      const eventDate = new Date(event.date).toDateString();
      return eventDate === today;
    });

    setTodayEvents(filtered);
  }, [events]);

  return (
    <section className="nearby-food">
      <div className="nearby-food-container">
        <h2>Nearby Food Today</h2>
        <p className="subtitle">
          Today’s food events near your location
        </p>

        {todayEvents.length === 0 ? (
          <p>No food events today near you</p>
        ) : (
          <div className="food-cards">
            {todayEvents.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                onClick={() => setSelectedEvent(event)}
              />
            ))}
          </div>
        )}
      </div>

      {/* EVENT DETAILS */}
      <EventDetails
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </section>
  );
}

export default NearbyFood;
