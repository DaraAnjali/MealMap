import "./DonateCard.css";

export default function DonateCard({ event, onDonate }) {
  return (
    <div className="donation-card">
      <h3>{event.title}</h3>
      <p>{event.locationName}</p>

      <p>
        <strong>Frequency:</strong>{" "}
        {event.recurrence === "daily"
          ? "Daily"
          : `Weekly (${[
              "Sunday","Monday","Tuesday","Wednesday",
              "Thursday","Friday","Saturday"
            ][event.weeklyDay]})`}
      </p>

      <button onClick={onDonate}>💖 Donate</button>
    </div>
  );
}
