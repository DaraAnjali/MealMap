import "./FAQ.css";

function FAQ() {
  return (
    <section className="faq">
      <div className="faq-container">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-item">
          <h4>Is MealMap free to use?</h4>
          <p>Yes, MealMap is completely free for users and volunteers.</p>
        </div>

        <div className="faq-item">
          <h4>How do I find food near me?</h4>
          <p>
            Use the Find Food page to search nearby locations or browse the map.
          </p>
        </div>

        <div className="faq-item">
          <h4>Can I volunteer without donating?</h4>
          <p>
            Absolutely. Volunteering and donating are independent options.
          </p>
        </div>

        <div className="faq-item">
          <h4>Who can post food events?</h4>
          <p>
            NGOs, community organizers, and any users can post food events.
          </p>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
