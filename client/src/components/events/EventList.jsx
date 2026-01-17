import "./EventList.css";
import EventCard from "./EventCard";

function EventList() {
  return (
    <section className="event-list">
      <div className="event-list-header">
        <h1>Upcoming Food Events</h1>
        <p>Discover community meals and food drives near you</p>
      </div>

      <div className="event-grid">
        <EventCard
          title="Community Lunch Drive"
          location="Hyderabad"
          date="12 Aug 2026"
          time="12:00 PM"
        />
        <EventCard
          title="Temple Free Meals"
          location="Secunderabad"
          date="15 Aug 2026"
          time="1:00 PM"
        />
        <EventCard
          title="NGO Food Camp"
          location="Gachibowli"
          date="18 Aug 2026"
          time="11:30 AM"
        />
      </div>
    </section>
  );
}

export default EventList;
