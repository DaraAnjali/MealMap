import { useNavigate } from "react-router-dom";
import "./Hero.css";
import heroImage from "../../assets/hero.png";

function Hero() {
  const navigate = useNavigate();

  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="hero-overlay">
        <div className="hero-content">
          <h1>Find Free Food Near You</h1>
          <p>
            Discover community meals, food events and daily free food locations
          </p>

          <div className="hero-buttons">
            <button
              className="hero-btn find-food"
              onClick={() => navigate("/find-food")}
            >
              Find Food Locations
            </button>

            <button
              className="hero-btn volunteer"
              onClick={() => navigate("/volunteer")}
            >
              Become a Volunteer
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
