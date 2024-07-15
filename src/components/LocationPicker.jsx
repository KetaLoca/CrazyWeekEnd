import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const LocationPicker = () => {
  const [location, setLocation] = useState({ lat: 40.419998, lng: -3.706174 }); // Ubicación inicial (Madrid)

  const handleSelect = (result) => {
    setLocation({
      lat: result.latLng.lat(),
      lng: result.latLng.lng(),
    });
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyATZpIVvnaIdZvwB8g5lsyTGNttQiTK23w"
      libraries={["places"]}
    >
      <GoogleMap
        mapContainerStyle={{ width: "400px", height: "400px" }}
        center={location}
        zoom={15}
        onClick={handleSelect}
      >
        <Marker position={location} />
      </GoogleMap>
    </LoadScript>
  );
};

export default LocationPicker;
