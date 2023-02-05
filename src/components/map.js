import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import React, { useState } from "react";
import store from "../store/store";

let center, setcenter;
const containerStyle = {
  width: "100%",
  height: "700px",
};
const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

//Function to subscribe state changes
async function syncStateChanges() {
  const previousState = await store.getState();
  const data = await JSON.parse(JSON.stringify(previousState.getMapCoOrdinates)).location;
  if (data) {
    const lat = data.lat ? data.lat : data.geometry.location.lat;
    const lng = data.lng ? data.lng : data.geometry.location.lng;
    setcenter({ lat, lng });
  }
}
store.subscribe(syncStateChanges);

//React Functional Component
const MapComponent = () => {
  [center, setcenter] = useState("");
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${apiKey}`,
    libraries: ["places"],
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={9.5}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {<Marker position={center} />}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default MapComponent;
