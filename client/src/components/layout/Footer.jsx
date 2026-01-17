import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* LEFT: LOGO */}
        <div className="footer-brand">
          <img src="/logo1.png" alt="Logo" />
          <p>Connecting people to free food and community support.</p>
        </div>

        {/* MIDDLE: LINKS */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <a href="/">Home</a>
          <a href="/find-food">Find Food</a>
          <a href="/events">Events</a>
          <a href="/volunteer">Volunteer</a>
          <a href="/donate">Donate</a>
        </div>

        {/* RIGHT: LEGAL */}
        <div className="footer-links">
          <h4>Legal</h4>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms & Conditions</a>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} All rights reserved
      </div>
    </footer>
  );
}

export default Footer;
