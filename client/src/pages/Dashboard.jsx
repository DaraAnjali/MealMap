import "./styles/Dashboard.css";
import { useEffect, useState } from "react";
import { api } from "../utils/api";
import EventCard from "../components/events/EventCard";
import { useNavigate } from "react-router-dom";
import DonationRequestCard from "../components/donate/DonationRequestCard";
import InfoEventForm from "../components/dashboard/InfoEventForm";
import EventDetails from "../components/events/EventDetails";

export default function Dashboard() {
  const [data, setData] = useState({
    conducted: [],
    volunteered: [],
    infoEvents: []
  });

  // ✅ Donation requests
  const [myDonationRequests, setMyDonationRequests] = useState([]);
  const [loadingDonations, setLoadingDonations] = useState(true);

  const [showInfoForm, setShowInfoForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const navigate = useNavigate();

  // ✅ Load dashboard + donation requests
  useEffect(() => {
    api.getDashboardEvents().then(setData);

    api.getMyDonationRequests()
      .then(setMyDonationRequests)
      .catch(() => setMyDonationRequests([]))
      .finally(() => setLoadingDonations(false));
  }, []);

  // ✅ Delete donation request
  const handleDeleteDonationRequest = async (id) => {
    if (!window.confirm("Delete this donation request?")) return;

    try {
      await api.deleteDonationRequest(id);
      setMyDonationRequests(prev =>
        prev.filter(req => req._id !== id)
      );
    } catch (err) {
      alert("Failed to delete donation request");
    }
  };

  const { conducted, volunteered, infoEvents } = data;

  return (
    <div className="dashboard-page">

      {/* EVENTS YOU CONDUCTED */}
      <div className="dashboard-section">
        <div className="section-header">
          <h3>Events You Conducted</h3>
          <div className="header-actions">
            <span className="count-badge">{conducted.length}</span>
            <button onClick={() => navigate("/events")}>
              Create Event
            </button>
          </div>
        </div>

        <div className="card-grid">
          {conducted.map(event => (
            <EventCard
              key={event._id}
              event={event}
              onClick={() =>
                setSelectedEvent({
                  ...event,
                  organizer: event.organizer?._id || event.organizer
                })
              }
            />
          ))}
        </div>
      </div>

      {/* EVENTS YOU VOLUNTEERED FOR */}
      <div className="dashboard-section">
        <div className="section-header">
          <h3>Events You Volunteered For</h3>
          <div className="header-actions">
            <span className="count-badge">{volunteered.length}</span>
            <button onClick={() => navigate("/volunteer")}>
              Volunteer
            </button>
          </div>
        </div>

        <div className="card-grid">
          {volunteered.map(event => (
            <EventCard
              key={event._id}
              event={event}
              onClick={() =>
                setSelectedEvent({
                  ...event,
                  organizer: event.organizer?._id || event.organizer
                })
              }
            />
          ))}
        </div>
      </div>

      {/* FOOD PLACES SHARED */}
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
              onClick={() =>
                setSelectedEvent({
                  ...event,
                  organizer: event.organizer?._id || event.organizer
                })
              }
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

      {/* ✅ MY DONATION REQUESTS */}
      <div className="dashboard-section">
        <div className="section-header">
          <h3>My Donation Requests</h3>
          <span className="count-badge">
            {myDonationRequests.length}
          </span>
        </div>

        {loadingDonations && (
          <p className="empty-text">Loading donation requests...</p>
        )}

        {!loadingDonations && myDonationRequests.length === 0 && (
          <p className="empty-text">No donation requests posted</p>
        )}

        <div className="card-grid">
          {myDonationRequests.map(req => (
            <DonationRequestCard
              key={req._id}
              data={req}
              isOwner={true}          // ✅ delete visible only here
              onDelete={() => handleDeleteDonationRequest(req._id)}
            />
          ))}
        </div>
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
