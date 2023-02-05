import React from "react";
import "./App.css";
import SearchLocationInput from "./components/search";
import MapComponent from "./components/map";
function App() {
  return (
    <div style={{ textAlign: "end" }}>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between"}}>
        <h1>Google Places</h1>
        <SearchLocationInput />
        </div>
        <MapComponent></MapComponent>
      </div>
    </div>
  );
}

export default App;
