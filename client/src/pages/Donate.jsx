import { useEffect, useState } from "react";
import { api } from "../utils/api";
import DonateCard from "../components/donate/DonateCard";
import DonateModal from "../components/donate/DonateModal";
import DonationRequestCard from "../components/donate/DonationRequestCard";
import DonationRequestModal from "../components/donate/DonationRequestModal";
import CreateDonationRequest from "../components/donate/CreateDonationRequest";

import "./styles/Donate.css";

export default function Donate() {
  const [events, setEvents] = useState([]);
  const [requests, setRequests] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    api.getDonatableEvents().then(setEvents);
    api.getDonationRequests().then(setRequests);
  }, []);

  return (
    <div className="donate-page">
      <div className="donate-header">
        <h1>Donate Food Support</h1>
        <p>Support daily & weekly food initiatives</p>
      </div>

      {/* DAILY & WEEKLY EVENTS */}
      <div className="donation-grid">
        {events.map((event) => (
          <DonateCard
            key={event._id}
            event={event}
            onDonate={() => setSelectedEvent(event)}
          />
        ))}
      </div>

      {/* NGO / TEMPLE DONATION REQUESTS */}
      <div className="donation-section">
        <h2 className="donation-section-title">
          Other Donation Requests
        </h2>

        <div className="donation-grid">
          {requests.map((req) => (
            <DonationRequestCard
              key={req._id}
              data={req}
              onDonate={() => setSelectedRequest(req)}
            />
          ))}
        </div>
      </div>

      
      <CreateDonationRequest />

      <DonateModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />

      <DonationRequestModal
        data={selectedRequest}
        onClose={() => setSelectedRequest(null)}
      />
    </div>
  );
}
