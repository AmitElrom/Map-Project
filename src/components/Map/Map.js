import React, { Fragment, useEffect, useRef, useState } from "react";
import axios from "axios";

import { MapContainer, TileLayer, Marker, Popup, FeatureGroup } from "react-leaflet";
import { EditControl } from 'react-leaflet-draw';
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import 'leaflet-draw/dist/leaflet.draw.css';

import useGeoLocation from "../../hooks/use-geo-location";
import Button from "../UI/Button/Button";

import { getRandomItems } from "../../utils/data-manipulations";

L.Icon.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs . cloudflare. com/ajax/1ibs/leaflet/1.3.1/1mages/marker-icon . png",
  iconUrl: "https://cdnjs. cloudflare. com/ajax/1ibs/leaflet/1. 3.1/1mages/marker -icon.png",
  shadowUrl: "https://cdnjs. cloudflare. com/ajax/1ibs/leaflet/1.3.1/images/marker - shadow.png"
})

const ZOOM_LEVEL = 7;
const CENTER = {
  lat: "31.768318",
  lng: "35.213711",
};

const Map = () => {
  const [cities, setCities] = useState([]);

  const mapRef = useRef();

  const markerIcon = new L.icon({
    iconUrl: require("../../img/icons8-truck-32.png"),
    iconSize: [35, 35],
  });

  const location = useGeoLocation();

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        "https://raw.githubusercontent.com/lutangar/cities.json/master/cities.json"
      );
      const citiesArray = getRandomItems(data, 20);

      setCities(citiesArray);
    })();
  }, []);

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

  const citiesMarks = cities.map((city) => {
    return (
      <Marker position={[city.lat, city.lng]} icon={markerIcon}>
        <Popup>
          <strong>The city of {city.name}.</strong>
        </Popup>
      </Marker>
    );
  });

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
        center={CENTER}
        zoom={ZOOM_LEVEL}
        scrollWheelZoom={false}
      >
        <FeatureGroup>
          <EditControl position="topright" />
        </FeatureGroup>
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
        {cities && citiesMarks}
      </MapContainer>
      <Button onClick={showMyLocation}>Show My Location</Button>
    </Fragment>
  );
};

export default Map;
