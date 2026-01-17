import { useNavigate } from "react-router-dom";
import "./QuickActions.css";

import findFoodImg from "../../assets/quick-actions/find-food.png";
import eventsImg from "../../assets/quick-actions/events.png";
import dailyFoodImg from "../../assets/quick-actions/daily-food.png";
import volunteerImg from "../../assets/quick-actions/volunteer.png";

function QuickActions() {
  const navigate = useNavigate();

  return (
    <section className="quick-actions">
      <div className="quick-actions-container">

        <div className="action-card" onClick={() => navigate("/find-food")}>
          <img src={findFoodImg} alt="Find Food" className="action-image" />
          <h3>Find Food on Map</h3>
          <p>Locate free food near you using our interactive map.</p>
        </div>

        <div className="action-card" onClick={() => navigate("/events")}>
          <img src={eventsImg} alt="Upcoming Events" className="action-image" />
          <h3>Upcoming Events</h3>
          <p>Explore community food drives and upcoming events.</p>
        </div>

        <div className="action-card" onClick={() => navigate("/find-food")}>
          <img src={dailyFoodImg} alt="Daily Food Locations" className="action-image" />
          <h3>Daily Food Locations</h3>
          <p>View places that serve free food every day.</p>
        </div>

        <div className="action-card" onClick={() => navigate("/volunteer")}>
          <img src={volunteerImg} alt="Volunteer" className="action-image" />
          <h3>Become a Volunteer</h3>
          <p>Join hands and help serve food to those in need.</p>
        </div>

      </div>
    </section>
  );
}

export default QuickActions;
