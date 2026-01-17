import "./HowItWorks.css";

function HowItWorks() {
  return (
    <section className="how-it-works">
      <div className="how-it-works-container">

        <h2>How It Works</h2>
        <p className="subtitle">
          Connecting people to free food in three simple steps
        </p>

        <div className="steps">

          <div className="step-card">
            <div className="step-number">1</div>
            <h3>Organizers Post Food</h3>
            <p>
              NGOs, temples, and communities post food availability and events.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">2</div>
            <h3>Users Find Food</h3>
            <p>
              People discover nearby free food locations using map and search.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Volunteers & Donors Help</h3>
            <p>
              Volunteers serve food and donors support to keep it running.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;
