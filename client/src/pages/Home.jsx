import "./styles/Home.css";
import Hero from "../components/home/Hero";
import QuickActions from "../components/home/QuickActions";
import NearbyFood from "../components/home/NearbyFood";
import HowItWorks from "../components/home/HowItWorks";
import VolunteerCTA from "../components/home/VolunteerCTA";
import DonateCTA from "../components/home/DonateCTA";
import FAQ from "../components/home/FAQ";
import MapView from "../components/map/MapView";
import { useEffect, useState } from "react";

function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;

      const res = await fetch(
        `https://mealmap-9fyr.onrender.com/api/events/nearby?lat=${latitude}&lng=${longitude}`
      );

      const data = await res.json();
      setEvents(data);
    });
  }, []);

  return (
    <div className="page-container">
      <Hero />
      <QuickActions />
      <NearbyFood events={events} />
      <MapView events={events} />
      <HowItWorks />
      <VolunteerCTA />
      <DonateCTA />
      <FAQ />
    </div>
  );
}

export default Home;
