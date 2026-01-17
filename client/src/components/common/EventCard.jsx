import "./EventCard.css";

export default function EventCard({ event, onClick, dashboard = false }) {
  return (
    <div className="event-card" onClick={() => onClick(event)}>
      <h3>{event.title}</h3>

      {/* Normal view (Home / Events page) */}
      {!dashboard && (
        <>
          <p>📍 {event.locationName}</p>
          <p>🕒 {event.startTime} - {event.endTime}</p>
        </>
      )}

      {/* Dashboard-specific flags */}
      {dashboard && (
        <div className="event-flags">
          {event.completed && <span className="flag completed">✅ Completed</span>}
          {event.createdByUserInfo && (
            <small className="flag info">ℹ️ User shared info</small>
          )}
        </div>
      )}
    </div>
  );
}
