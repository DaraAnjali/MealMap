import { useEffect, useState } from "react";
import { api } from "../utils/api";
import EventCard from "../components/events/EventCard";
import EventDetails from "../components/events/EventDetails";
import "./styles/Volunteer.css";

// ✅ NEW IMPORTS
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Volunteer() {
  const [events, setEvents] = useState([]);
  const [myEvents, setMyEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [activeEvent, setActiveEvent] = useState(null);

  // ✅ NEW HOOKS
  const { user } = useAuth();
  const navigate = useNavigate();

  // 🔹 All events (for dropdown)
  useEffect(() => {
    api.getEvents().then(setEvents);
  }, []);

  // 🔹 Events user volunteered for
  useEffect(() => {
    api.getMyVolunteering().then((data) => {
      const now = new Date();

      // ✅ remove completed events
      const activeEvents = data.filter(
        (event) => new Date(event.endsAt) > now
      );

      setMyEvents(activeEvents);
    });
  }, []);

  // ✅ UPDATED HANDLE VOLUNTEER
  const handleVolunteer = async () => {
    if (!user) {
      navigate("/register");
      return;
    }

    if (!selectedEvent) {
      alert("Please select an event");
      return;
    }

    const res = await api.volunteerForEvent({
      eventId: selectedEvent
    });

    if (res?.message === "Already volunteered") {
      alert("You already volunteered for this event");
    } else {
      alert("You have successfully joined as a volunteer!");
      api.getMyVolunteering().then(setMyEvents);
    }
  };

  return (
    <div className="volunteer-page">

      {/* ===================== */}
      {/* MY VOLUNTEERED EVENTS */}
      {/* ===================== */}
      {myEvents.length > 0 && (
        <div className="my-volunteer-events">
          <h2>My Volunteered Events</h2>

          <div className="event-list">
            {myEvents.map((event) => (
              <div key={event._id}>
                <EventCard
                  event={event}
                  onClick={() => setActiveEvent(event)}
                />

                <button
                  className="cancel-btn"
                  onClick={async (e) => {
                    e.stopPropagation();
                    await api.cancelVolunteering(event._id);
                    setMyEvents((prev) =>
                      prev.filter((ev) => ev._id !== event._id)
                    );
                  }}
                >
                  ❌ Cancel Volunteering
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EVENT DETAILS MODAL */}
      {activeEvent && (
        <EventDetails
          event={activeEvent}
          onClose={() => setActiveEvent(null)}
        />
      )}

      {/* ===================== */}
      {/* VOLUNTEER SECTION */}
      {/* ===================== */}
      <div className="volunteer-container">
        <h1>Become a Volunteer</h1>

        <p className="subtitle">
          Select an event and help us make a difference
        </p>

        <select
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
        >
          <option value="">Select Event</option>
          {events.map((event) => (
            <option key={event._id} value={event._id}>
              {event.title}
            </option>
          ))}
        </select>

        <button onClick={handleVolunteer}>
          Become Volunteer
        </button>
      </div>

    </div>
  );
}

export default Volunteer;
