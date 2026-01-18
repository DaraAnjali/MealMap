import "./DonationRequestModal.css";

export default function DonationRequestModal({ data, onClose }) {
  if (!data) return null;

  return (
    <div className="donation-modal-overlay">
      <div className="donation-modal">
        <button className="close-btn" onClick={onClose}>✖</button>

        <h2 className="modal-title">{data.name}</h2>

        <p className="modal-purpose">{data.purpose}</p>

        {data.qrCode && (
          <img
            src={`${import.meta.env.VITE_API_URL}${data.qrCode}`}
            alt="Donation QR"
            className="qr-image"
          />
        )}

        <p><strong>Contact:</strong> {data.contact}</p>
        <p><strong>Target Amount:</strong> ₹{data.targetAmount}</p>

        <button className="done-btn" onClick={onClose}>
          Done
        </button>
      </div>
    </div>
  );
}
