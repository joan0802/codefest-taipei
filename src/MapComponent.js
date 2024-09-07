// src/components/MapComponent.js
import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = {
  lat: 25.0330, // 台北的經度
  lng: 121.5654, // 台北的緯度
};

function MapComponent() {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [places, setPlaces] = useState([]);

  const handleLoadMap = (map) => {
    const request = {
      location: center,
      radius: "5000",
      type: ["daycare"], // 搜尋育兒中心
    };

    const service = new window.google.maps.places.PlacesService(map);
    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setPlaces(results);
      }
    });
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyCxVDVlIHLV_qsVtIBkm879cNWsi26PJDs" libraries={["places"]}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={12}
        onLoad={handleLoadMap}
      >
        {places.map((place) => (
          <Marker
            key={place.place_id}
            position={{
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            }}
            onClick={() => {
              setSelectedPlace(place);
            }}
          />
        ))}

        {selectedPlace && (
          <InfoWindow
            position={{
              lat: selectedPlace.geometry.location.lat(),
              lng: selectedPlace.geometry.location.lng(),
            }}
            onCloseClick={() => {
              setSelectedPlace(null);
            }}
          >
            <div>
              <h2>{selectedPlace.name}</h2>
              <p>{selectedPlace.vicinity}</p>
              {selectedPlace.rating && <p>評價: {selectedPlace.rating} / 5</p>}
              {selectedPlace.user_ratings_total && <p>評論數量: {selectedPlace.user_ratings_total}</p>}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
}

export default MapComponent;
