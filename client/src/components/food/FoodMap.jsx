import "./FoodMap.css";
import MapView from "../map/MapView";

function FoodMap({ events }) {
  if (!events || events.length === 0) return null;

  return (
    <div className="food-map">
      <MapView events={events} />
    </div>
  );
}

export default FoodMap;
