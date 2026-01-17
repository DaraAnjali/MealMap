import "./styles/Profile.css";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user } = useAuth();

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h1>My Profile</h1>
        <p className="profile-subtext">
          Manage your account information
        </p>

        <div className="profile-info">
          <div className="profile-row">
            <span>Name</span>
            <p>{user?.name}</p>
          </div>

          <div className="profile-row">
            <span>Email</span>
            <p>{user?.email}</p>
          </div>

          <div className="profile-row">
            <span>Account Type</span>
            <p>User</p>
          </div>
        </div>

        <div className="profile-note">
          Editing profile will be available after backend integration.
        </div>
      </div>
    </div>
  );
}

export default Profile;
