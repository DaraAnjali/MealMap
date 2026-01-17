import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import useGeolocation from "../../hooks/useGeolocation";

// ✅ USER ICON
import userIconImg from "../../assets/user-location.png";

// fix leaflet marker issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
});

// ✅ CUSTOM USER ICON
const userIcon = new L.Icon({
  iconUrl: userIconImg,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

function MapView({ events }) {
  const { location, loading, error } = useGeolocation();

  // fallback center (India)
  const center = location
    ? [location.lat, location.lng]
    : [17.385, 78.4867];

  // ✅ ONLY return link if user location + exactly 1 event exists
  const googleMapsLink = () => {
    if (!location || !events?.length) return null;

    const validEvents = events.filter(e => e.coordinates?.coordinates);

    // must be exactly 1 event
    if (validEvents.length !== 1) return null;

    const event = validEvents[0];
    const lat = event.coordinates.coordinates[1];
    const lng = event.coordinates.coordinates[0];

    return `https://www.google.com/maps/dir/?api=1&origin=${location.lat},${location.lng}&destination=${lat},${lng}`;
  };

  const link = googleMapsLink();

  return (
    <>
      <MapContainer
        center={center}
        zoom={13}
        zoomControl={false}
        attributionControl={false}
        style={{ height: "320px", width: "100%", borderRadius: "16px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* USER LOCATION */}
        {location && (
          <Marker
            position={[location.lat, location.lng]}
            icon={userIcon}
          >
            <Popup>You are here</Popup>
          </Marker>
        )}

        {/* EVENT LOCATIONS */}
        {events?.map((event) => {
          if (!event.coordinates?.coordinates) return null;

          const lat = event.coordinates.coordinates[1];
          const lng = event.coordinates.coordinates[0];

          return (
            <Marker key={event._id} position={[lat, lng]}>
              <Popup>
                <strong>{event.title}</strong>
                <br />
                {event.locationName}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* GOOGLE MAPS LINK (only shows when exactly 1 event + user exists) */}
      {link && (
        <div style={{ textAlign: "right", marginTop: "8px" }}>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#15803d", fontWeight: 500 }}
          >
            📍 Open in Google Maps
          </a>
        </div>
      )}

      {loading && <p>Getting your location…</p>}
      {error && <p>{error}</p>}
    </>
  );
}

export default MapView;
