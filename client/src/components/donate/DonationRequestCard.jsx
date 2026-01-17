import "./DonationRequestCard.css";

export default function DonationRequestCard({ data, onDonate }) {
  return (
    <div className="donation-request-card">
      <h3 className="donation-title">{data.name}</h3>

      <p className="donation-purpose">
        {data.purpose}
      </p>

      <span className="read-more" onClick={onDonate}>
        Read more
      </span>

      <p className="donation-target">
        <strong>Target:</strong> ₹{data.targetAmount}
      </p>

      <button className="donate-btn" onClick={onDonate}>
        Donate
      </button>
    </div>
  );
}
