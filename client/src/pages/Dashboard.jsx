import "./styles/Dashboard.css";
import { useEffect, useState } from "react";
import { api } from "../utils/api";
import EventCard from "../components/events/EventCard";
import { useNavigate } from "react-router-dom";
import InfoEventForm from "../components/dashboard/InfoEventForm";
import EventDetails from "../components/events/EventDetails";

export default function Dashboard() {
  const [data, setData] = useState({
    conducted: [],
    volunteered: [],
    infoEvents: []
  });

  const [showInfoForm, setShowInfoForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    api.getDashboardEvents().then(setData);
  }, []);

  const createdEvents = data.conducted;
  const volunteerEvents = data.volunteered;
  const infoEvents = data.infoEvents;

  return (
    <div className="dashboard-page">

      {/* EVENTS YOU CONDUCTED */}
      <div className="dashboard-section">
        <div className="section-header">
          <h3>Events You Conducted</h3>
          <div className="header-actions">
            <span className="count-badge">{createdEvents.length}</span>
            <button onClick={() => navigate("/events")}>
              Create Event
            </button>
          </div>
        </div>

        <div className="card-grid">
          {createdEvents.map(event => (
            <EventCard
              key={event._id}
              event={event}
              onClick={() => setSelectedEvent({
                ...event,
                organizer: event.organizer?._id || event.organizer
              })}
            />
          ))}
        </div>
      </div>

      {/* EVENTS YOU VOLUNTEERED FOR */}
      <div className="dashboard-section">
        <div className="section-header">
          <h3>Events You Volunteered For</h3>
          <div className="header-actions">
            <span className="count-badge">{volunteerEvents.length}</span>
            <button onClick={() => navigate("/volunteer")}>
              Volunteer
            </button>
          </div>
        </div>

        <div className="card-grid">
          {volunteerEvents.map(event => (
            <EventCard
              key={event._id}
              event={event}
              onClick={() => setSelectedEvent({
                ...event,
                organizer: event.organizer?._id || event.organizer
              })}
            />
          ))}
        </div>
      </div>

      {/* FOOD PLACES SHARED BY YOU */}
      <div className="dashboard-section">
        <div className="section-header">
          <h3>Food Places Shared by You</h3>
          <span className="count-badge">{infoEvents.length}</span>
        </div>

        {infoEvents.length === 0 && (
          <p className="empty-text">No food places shared</p>
        )}

        <div className="card-grid">
          {infoEvents.map(event => (
            <EventCard
              key={event._id}
              event={event}
              onClick={() => setSelectedEvent({
                ...event,
                organizer: event.organizer?._id || event.organizer
              })}
            />
          ))}
        </div>

        <button
          className="primary-btn"
          onClick={() => setShowInfoForm(true)}
        >
          Share Food Info
        </button>
      </div>

      <InfoEventForm
        open={showInfoForm}
        onClose={() => setShowInfoForm(false)}
        onSuccess={() => window.location.reload()}
      />

      {selectedEvent && (
        <EventDetails
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          fromDashboard={true}
        />
      )}

    </div>
  );
}
