import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Render the app
createRoot(document.getElementById("root")!).render(<App />);

// Load Google Maps API (only once)
const loadGoogleMaps = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    console.warn("VITE_GOOGLE_MAPS_API_KEY is missing. Delivery fee will fallback to ₦1,500.");
    return;
  }

  if (window.google?.maps) {
    return; // Already loaded
  }

  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
  script.async = true;
  script.defer = true;
  script.onload = () => {
    console.log("Google Maps API loaded successfully");
  };
  script.onerror = () => {
    console.error("Failed to load Google Maps API");
  };

  document.head.appendChild(script);
};

// Load after DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadGoogleMaps);
} else {
  loadGoogleMaps();
}
