import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const libraries = ["places"];

const LocationViewer = ({ location }) => {
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyATZpIVvnaIdZvwB8g5lsyTGNttQiTK23w"
      libraries={libraries}
    >
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "200px",
          marginTop: '20px',
        }}
        zoom={15}
        center={location}
      >
        <Marker position={location} />
      </GoogleMap>{" "}
    </LoadScript>
  );
};

export default LocationViewer;
