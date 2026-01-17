import { useState } from "react";
import "./DonateModal.css";

export default function DonateModal({ event, onClose }) {
  const [showContact, setShowContact] = useState(false);

  if (!event) return null;

  return (
    <div className="event-overlay">
      <div className="event-details donate-form-container">

        <button className="close-btn" onClick={onClose}>✖</button>

        <h2>Donate to {event.title}</h2>

        {/* ✅ ORGANIZER UPLOADED QR */}
        {event.qrCode ? (
          <>
            <img
              src={`http://localhost:5000${event.qrCode}`}
              alt="Donation QR"
              style={{ display: "block", margin: "20px auto", width: "200px" }}
            />

            <button
              style={{ marginBottom: "12px" }}
              onClick={() => setShowContact(!showContact)}
            >
              Contact organizer
            </button>
          </>
        ) : (
          <p style={{ textAlign: "center", color: "#777" }}>
            No donation QR provided by organizer
          </p>
        )}

        {/* ORGANIZER DETAILS */}
        {showContact && (
          <div style={{ textAlign: "center" }}>
            <p><strong>Contact Organizer</strong></p>
            <p>{event.organizerContact}</p>
          </div>
        )}

        <button onClick={onClose} className="submit-btn">
          Done
        </button>
      </div>
    </div>
  );
}
