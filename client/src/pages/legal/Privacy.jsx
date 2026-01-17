import "./Legal.css";

function Privacy() {
  return (
    <div className="legal-page">
      <h1>Privacy Policy</h1>

      <p>
        MealMap respects your privacy. We only collect the minimum information
        required to provide our services.
      </p>

      <h3>Information We Collect</h3>
      <ul>
        <li>Name</li>
        <li>Email address</li>
        <li>Encrypted password</li>
        <li>Location (to show nearby events)</li>
      </ul>

      <p>
        We do not collect any payment or banking information.
      </p>

      <h3>Cookies</h3>
      <p>
        MealMap uses cookies to manage login sessions and improve user
        experience.
      </p>

      <h3>Third-Party Services</h3>
      <p>
        We use map services to display event locations. No payment services are
        integrated.
      </p>

      <p>
        If you have any privacy concerns, contact:
        <br />
        <strong>mealmapwebsite@gmail.com</strong>
      </p>
    </div>
  );
}

export default Privacy;
