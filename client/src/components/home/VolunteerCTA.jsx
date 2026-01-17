import { useNavigate } from "react-router-dom";
import "./VolunteerCTA.css";

function VolunteerCTA() {
  const navigate = useNavigate();

  return (
    <section className="volunteer-cta">
      <div className="volunteer-cta-container">

        <h2>Become a Volunteer</h2>
        <p>
          Join our community and help distribute food to those who need it most.
        </p>

        <button onClick={() => navigate("/volunteer")}>
          Join as Volunteer
        </button>

      </div>
    </section>
  );
}

export default VolunteerCTA;
