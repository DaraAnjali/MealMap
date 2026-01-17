import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({ isOpen, close }) {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <h2>MealMap</h2>
        <button onClick={close}>✖</button>
      </div>

      <nav>
        <Link to="/" onClick={close}>Home</Link>
        <Link to="/find-food" onClick={close}>Find Food</Link>
        <Link to="/events" onClick={close}>Events</Link>
        <Link to="/volunteer" onClick={close}>Volunteer</Link>
        <Link to="/donate" onClick={close}>Donate</Link>
        <Link to="/dashboard" onClick={close}>Dashboard</Link>
      </nav>
    </div>
  );
}

export default Sidebar;
