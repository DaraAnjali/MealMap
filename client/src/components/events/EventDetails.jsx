import "./EventDetails.css";
import MapView from "../map/MapView";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { api } from "../../utils/api";

export default function EventDetails({ event, onClose, fromDashboard = false }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!event) return null;

  const isInfoEvent = event.createdByUserInfo === true;

  const lat = event.coordinates.coordinates[1];
  const lng = event.coordinates.coordinates[0];

  const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;

  const isJoined = event.volunteers?.some(
    (v) => v._id === user?._id || v === user?._id
  );

  const isRecurring =
    event.recurrence === "daily" || event.recurrence === "weekly";

  const canDonate =
    !isInfoEvent &&
    isRecurring &&
    event.enableDonation;

  // 🔁 UPDATED showDelete logic
  const showDelete =
    fromDashboard &&
    user &&
    (
      event.organizer === user._id ||
      event.organizer?._id === user._id
    );

  const handleVolunteer = () => {
    navigate("/volunteer", {
      state: {
        eventId: event._id,
        eventTitle: event.title
      }
    });
  };

  const handleDonate = () => {
    navigate("/donate", { state: { event } });
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this event?")) return;
    await api.deleteEvent(event._id);
    window.location.reload();
  };

  return (
    <div className="event-overlay">
      <div className="event-details">
        <button className="close-btn" onClick={onClose}>✖</button>

        <h2>{event.title}</h2>

        {isInfoEvent && (
          <p className="alert">
            ⚠️ This is user-shared information. The user is not responsible if the event is not conducted.
          </p>
        )}

        <p><strong>Location:</strong> {event.locationName}</p>
        <p><strong>Address:</strong> {event.address}</p>

        <p>
          <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
        </p>

        <p>
          <strong>Time:</strong> {event.startTime} – {event.endTime}
        </p>

        <p>
          <strong>Frequency:</strong>{" "}
          {event.recurrence === "daily" && "Daily Event"}
          {event.recurrence === "weekly" && "Weekly Event"}
          {event.recurrence === "one-time" && "One-Time Event"}
        </p>

        {event.recurrence === "weekly" && (
          <p>
            <strong>Occurs on:</strong>{" "}
            {["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][event.weeklyDay]}
          </p>
        )}

        <p><strong>Event Type:</strong> {event.eventType}</p>

        {!isInfoEvent && (
          <>
            <p>
              <strong>Organizer:</strong>{" "}
              {event.organizer?.name || "Community Member"}
            </p>
            <p><strong>Volunteers Joined:</strong> {event.volunteers?.length || 0}</p>
          </>
        )}

        <p><strong>Coordinates:</strong> {lat}, {lng}</p>

        {!isInfoEvent && user && (
          <button onClick={handleVolunteer}>
            {isJoined ? "✅ Already a Volunteer" : "🤝 Join as Volunteer"}
          </button>
        )}

        {!isInfoEvent && canDonate && (
          <button className="donate-btn" onClick={handleDonate}>
            💰 Donate
          </button>
        )}

        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noreferrer"
          className="maps-btn"
        >
          📍 Open in Google Maps
        </a>

        <div className="details-map">
          <MapView events={[event]} />
        </div>

        {showDelete && (
          <button
            onClick={handleDelete}
            style={{ background: "#dc2626", color: "#fff", marginTop: "10px" }}
          >
            Delete Event
          </button>
        )}
      </div>
    </div>
  );
}
