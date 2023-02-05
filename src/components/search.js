import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import getMapCoOrdinates from "../actions/map";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";

let autoComplete, dispatch;

const mapDispatchToProps = {
  getMapCoOrdinates,
};
const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

// Google Places API script load functionality
const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

// Seaerch load functionality
function handleScriptLoad(updateQuery, autoCompleteRef) {
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current
    // Below is the sample if needed to customise the request data
    // { types: ["(cities)"], componentRestrictions: { country: "us" } }
  );
  autoComplete.setFields([
    "address_components",
    "formatted_address",
    "geometry",
    "name",
  ]);
  autoComplete.addListener("place_changed", () =>
    handlePlaceSelect(updateQuery)
  );
}

// Dispatch selected location data
async function handlePlaceSelect(updateQuery) {
  const addressObject = autoComplete.getPlace();
  const query = addressObject.formatted_address;
  updateQuery(query);
  dispatch(getMapCoOrdinates(addressObject));
}

// React Functional Component
function SearchLocationInput() {
  dispatch = useDispatch();
  dispatch({ type: "GET_DEFAULT_LOCATION_COORDINATES" });
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef)
    );
  }, []);

  return (
    <div className="search-location-input">
      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 1, width: "50ch" } }}
        noValidate
        autoComplete="off"
      >
        <TextField
          inputRef={autoCompleteRef}
          onChange={(event) => setQuery(event.target.value)}
          value={query}
          label="Enter a Location"
          variant="outlined"
        />
      </Box>
    </div>
  );
}

// export default SearchLocationInput;
export default connect(null, mapDispatchToProps)(SearchLocationInput);
