import React, { Fragment, useRef, useState } from "react";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L, { marker } from "leaflet";
import "leaflet/dist/leaflet.css";

import useGeoLocation from "../../hooks/use-geo-location";
import Button from "../UI/Button/Button";

const ZOOM_LEVEL = 9;

const Map = () => {
  const [center, setCenter] = useState({
    lat: "32.104569500422855",
    lng: "34.87674447158233",
  });

  const mapRef = useRef();

  const markerIcon = new L.icon({
    iconUrl: require("../../img/icons8-truck-32.png"),
    iconSize: [35, 35],
  });

  const location = useGeoLocation();

  const showMyLocation = () => {
    if (location.loaded && !location.error) {
      mapRef.current.flyTo(
        [location.coordinates.lat, location.coordinates.lng],
        18,
        { animate: true }
      );
    } else {
      alert(location.error.message);
    }
  };

  return (
    <Fragment>
      <MapContainer
        ref={mapRef}
        style={{
          width: "100%",
          height: "70vh",
          display: "flex",
          justifyContent: "center",
        }}
        center={center}
        zoom={ZOOM_LEVEL}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <Marker position={[center.lat, center.lng]} icon={markerIcon}>
        <Popup>
          <strong>Trucker marker of my location.</strong>
        </Popup>
      </Marker> */}
        {location.loaded && !location.error && (
          <Marker
            position={[location.coordinates.lat, location.coordinates.lng]}
            icon={markerIcon}
          >
            <Popup>
              <strong>My current location.</strong>
            </Popup>
          </Marker>
        )}
      </MapContainer>
      <Button onClick={showMyLocation}>Show My Location</Button>
    </Fragment>
  );
};

export default Map;
