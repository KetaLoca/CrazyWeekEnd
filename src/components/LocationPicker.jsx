import React, { useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const API_KEY = "AIzaSyB8lNP5tJYUUXK8m0b6dTg-ggvVDD5Rm38";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};
const center = {
  lat: -3.745,
  lng: -38.523,
};

const LocationPicker = ({ onLocationSelected }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries,
  });

  const [marker, setMarker] = useState(null);

  const handleMapClick = (event) => {
    setMarker({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    onLocationSelected({ lat: event.latLng.lat(), lng: event.latLng.lng() });
  };

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={8}
      center={center}
      onClick={handleMapClick}
    >
      {marker && <Marker position={marker} />}
    </GoogleMap>
  );
};

export default LocationPicker;