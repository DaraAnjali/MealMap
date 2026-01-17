import "./DonateCTA.css";
import { useNavigate } from "react-router-dom";

function DonateCTA() {
  const navigate = useNavigate();

  return (
    <section className="donate-cta">
      <div className="donate-cta-container">
        <h2>Support the Mission</h2>
        <p>
          Your donation helps us connect people with free food and support
          community kitchens and volunteers.
        </p>
        <button onClick={() => navigate("/donate")}>
          Donate
        </button>
      </div>
    </section>
  );
}

export default DonateCTA;
