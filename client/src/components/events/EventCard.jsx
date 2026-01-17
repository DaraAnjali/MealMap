import "./EventCard.css";

const EventCard = ({ event, onClick }) => {
  return (
    <div
      className="event-card"
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
      role={onClick ? "button" : undefined}
    >
      <h3>{event.title}</h3>
      <p>{event.locationName}</p>
      <p>
        {new Date(event.date).toLocaleDateString()} |{" "}
        {event.startTime} – {event.endTime}
      </p>
      <p>Type: {event.eventType}</p>

      {!event.createdByUserInfo && (
        <p>Volunteers: {event.volunteers?.length || 0}</p>
      )}
    </div>
  );
};

export default EventCard;
