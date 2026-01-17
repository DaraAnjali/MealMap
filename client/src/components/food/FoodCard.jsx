import "./FoodCard.css";

function FoodCard({ data, onClick }) {
  return (
    <div className="food-card" onClick={onClick}>
      <h3>{data.title}</h3>
      <p className="food-area">{data.locationName}</p>
      <p className="food-time">
        {data.startTime} – {data.endTime}
      </p>
      <button>View Details</button>
    </div>
  );
}

export default FoodCard;
