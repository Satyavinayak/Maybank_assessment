import {
  GET_LOCATION_COORDINATES,
  GET_DEFAULT_LOCATION_COORDINATES,
} from "../actionTypes/map";
const initialState = {
  loading: false,
  location: { lat: 3.1473288, lng: 101.69940927844398 },
};
export function getMapCoOrdinates(state = initialState, action) {
  switch (action.type) {
    case GET_LOCATION_COORDINATES:
      return {
        location: action.payload,
        loading: true,
      };
    case GET_DEFAULT_LOCATION_COORDINATES:
      return {
        location: state.location,
        loading: true,
      };

    default:
      return state;
  }
}
