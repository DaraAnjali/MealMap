import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState, useRef, useEffect } from "react";
import Sidebar from "../Sidebar";
import "./Navbar.css";

// ✅ NEW IMPORTS
import SearchResults from "../search/SearchResults";
import { api } from "../../utils/api";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 🔍 SEARCH STATE
  const [search, setSearch] = useState("");

  // ✅ NEW STATES
  const [allEvents, setAllEvents] = useState([]);
  const [results, setResults] = useState([]);

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
  };

  // ❌ REMOVED handleSearch function completely

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ LOAD ALL EVENTS ONCE
  useEffect(() => {
    api.getEvents().then(setAllEvents);
  }, []);

  // ✅ LIVE SEARCH FILTERING
  useEffect(() => {
    if (!search.trim()) {
      setResults([]);
      return;
    }

    const q = search.toLowerCase();

    const filtered = allEvents.filter((e) =>
      e.title?.toLowerCase().includes(q) ||
      e.locationName?.toLowerCase().includes(q)
    );

    setResults(filtered);
  }, [search, allEvents]);

  return (
    <>
      <Sidebar isOpen={sidebarOpen} close={() => setSidebarOpen(false)} />

      <header className="navbar">
        <div className="navbar-container">

          {/* LEFT */}
          <div className="navbar-left">
            <button className="menu-btn" onClick={() => setSidebarOpen(true)}>
              ☰
            </button>
            <img src="/logo1.png" alt="Logo" className="navbar-logo" />
          </div>

          {/* CENTER */}
          <div className="navbar-center">
            <div className="navbar-search">
              {/* ✅ INPUT MODIFIED */}
              <input
                type="text"
                placeholder="Search area or event name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              {/* Button stays visually, does nothing */}
              <button>Find Food</button>
            </div>

            <nav className="navbar-links">
              <NavLink to="/" end className="nav-link">Home</NavLink>
              <NavLink to="/find-food" className="nav-link">Find Food</NavLink>
              <NavLink to="/events" className="nav-link">Events</NavLink>
              <NavLink to="/volunteer" className="nav-link">Volunteer</NavLink>
              <NavLink to="/donate" className="nav-link">Donate</NavLink>

              {user && (
                <NavLink to="/dashboard" className="nav-link">
                  Dashboard
                </NavLink>
              )}
            </nav>
          </div>

          {/* RIGHT */}
          <div className="navbar-right">
            {!user ? (
              <>
                <NavLink to="/login" className="nav-link login-link">
                  Login
                </NavLink>
                <NavLink to="/register" className="register-btn">
                  Register
                </NavLink>
              </>
            ) : (
              <div className="profile-dropdown" ref={dropdownRef}>
                <span
                  className="profile-name"
                  onClick={() => setOpen((prev) => !prev)}
                >
                  {user.name}
                </span>

                {open && (
                  <div className="dropdown-menu">
                    <span onClick={() => navigate("/profile")}>Profile</span>
                    <span onClick={() => navigate("/dashboard")}>Dashboard</span>
                    <span className="logout" onClick={handleLogout}>
                      Logout
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </header>

      {/* ✅ RESULTS PANEL */}
      {results.length > 0 && (
        <SearchResults
          results={results}
          onClose={() => setResults([])}
        />
      )}
    </>
  );
}

export default Navbar;
