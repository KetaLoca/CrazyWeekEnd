import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const libraries = ["places"];

const LocationPicker = ({ onLocationSelected }) => {
  const [location, setLocation] = useState({ lat: 40.419998, lng: -3.706174 });

  const handleSelect = (result) => {
    setLocation({
      lat: result.latLng.lat(),
      lng: result.latLng.lng(),
    });
    onLocationSelected({
      lat: result.latLng.lat(),
      lng: result.latLng.lng(),
    });
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyATZpIVvnaIdZvwB8g5lsyTGNttQiTK23w"
      libraries={libraries}
    >
      <GoogleMap
        mapContainerStyle={{ width: "420px", height: "300px" }}
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
