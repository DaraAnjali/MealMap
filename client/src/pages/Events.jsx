import "./styles/Events.css";
import { useEffect, useState } from "react";
import EventCard from "../components/events/EventCard";
import EventDetails from "../components/events/EventDetails";
import MapView from "../components/map/MapView";
import { api } from "../utils/api";

// ✅ NEW IMPORTS
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showCreate, setShowCreate] = useState(false);

  // ✅ NEW HOOKS
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    locationName: "",
    address: "",
    lat: "",
    lng: "",
    date: "",
    startTime: "",
    endTime: "",
    eventType: "General",

    recurrence: "one-time",
    weeklyDay: "",
    enableDonation: false,
    organizerContact: "",
    donationQr: null,
    organizerPhone: "",
    organizerEmail: ""
  });

  const loadEvents = async () => {
    setLoading(true);
    const data = await api.getEvents();
    setEvents(data);
    setLoading(false);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else if (type === "file") {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("locationName", form.locationName);
    formData.append("address", form.address);
    formData.append("date", form.date);
    formData.append("startTime", form.startTime);
    formData.append("endTime", form.endTime);
    formData.append("eventType", form.eventType);
    formData.append("recurrence", form.recurrence);
    formData.append("weeklyDay", form.weeklyDay || "");
    formData.append("enableDonation", form.enableDonation);
    formData.append("organizerContact", form.organizerContact);

    formData.append(
      "coordinates",
      JSON.stringify({
        type: "Point",
        coordinates: [Number(form.lng), Number(form.lat)]
      })
    );

    if (form.donationQr) {
      formData.append("donationQr", form.donationQr);
    }

    await api.createEvent(formData);

    setShowCreate(false);
    loadEvents();
  };

  return (
    <div className="events-page">
      {/* HEADER */}
      <div className="events-header">
        <div>
          <h1>Food Events</h1>
          <p>Discover free food events near you</p>
        </div>

        {/* ✅ UPDATED BUTTON */}
        <button
          className="create-btn"
          onClick={() => {
            if (!user) {
              navigate("/register");
              return;
            }
            setShowCreate(true);
          }}
        >
          + Create Event
        </button>
      </div>

      {/* EVENTS + MAP */}
      {loading ? (
        <p>Loading events...</p>
      ) : (
        <div className="events-content">
          <div className="events-list">
            {events.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                onClick={() => setSelectedEvent(event)}
              />
            ))}
          </div>

          <div className="events-map">
            <MapView events={events} />
          </div>
        </div>
      )}

      {/* EVENT DETAILS MODAL */}
      <EventDetails
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />

      {/* CREATE EVENT MODAL */}
      {showCreate && (
        <div className="event-overlay">
          <div className="event-details">
            <button className="close-btn" onClick={() => setShowCreate(false)}>
              ✖
            </button>

            <h2>Create Event</h2>

            <form className="event-form" onSubmit={handleCreate}>
              <input
                name="title"
                placeholder="Event Title"
                onChange={handleChange}
                required
              />

              <input
                name="locationName"
                placeholder="City / Area"
                onChange={handleChange}
                required
              />

              <input
                name="address"
                placeholder="Address"
                onChange={handleChange}
                required
              />

              <div className="row">
                <input
                  name="lat"
                  placeholder="Latitude"
                  onChange={handleChange}
                  required
                />
                <input
                  name="lng"
                  placeholder="Longitude"
                  onChange={handleChange}
                  required
                />
              </div>

              <input type="date" name="date" onChange={handleChange} required />

              <div className="row">
                <input type="time" name="startTime" onChange={handleChange} required />
                <input type="time" name="endTime" onChange={handleChange} required />
              </div>

              <select name="eventType" onChange={handleChange}>
                <option value="General">General</option>
                <option value="AyyappaDeeksha">Ayyappa Deeksha</option>
                <option value="Special">Special</option>
              </select>

              <select name="recurrence" value={form.recurrence} onChange={handleChange}>
                <option value="one-time">One Time</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
              </select>

              {form.recurrence === "weekly" && (
                <select
                  name="weeklyDay"
                  value={form.weeklyDay}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Day</option>
                  <option value="0">Sunday</option>
                  <option value="1">Monday</option>
                  <option value="2">Tuesday</option>
                  <option value="3">Wednesday</option>
                  <option value="4">Thursday</option>
                  <option value="5">Friday</option>
                  <option value="6">Saturday</option>
                </select>
              )}

              <label style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
                <input
                  type="checkbox"
                  name="enableDonation"
                  checked={form.enableDonation}
                  onChange={(e) =>
                    setForm({ ...form, enableDonation: e.target.checked })
                  }
                />
                Enable Donations for this Event
              </label>

              {form.enableDonation && (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    name="donationQr"
                    onChange={handleChange}
                    required
                  />
                  <input
                    name="organizerContact"
                    placeholder="Organizer Contact Number"
                    onChange={handleChange}
                    required
                  />
                  <input
                    name="organizerPhone"
                    placeholder="Organizer Phone"
                    onChange={handleChange}
                  />
                  <input
                    name="organizerEmail"
                    placeholder="Organizer Email (optional)"
                    onChange={handleChange}
                  />
                </>
              )}

              <button type="submit" className="submit-btn">
                Create Event
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Events;
