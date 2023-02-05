import {
  GET_LOCATION_COORDINATES,
  GET_DEFAULT_LOCATION_COORDINATES,
} from "./../actionTypes/map";

export default function getMapCoOrdinates(data) {
  return (dispatch) => {
    dispatch({
      type: GET_LOCATION_COORDINATES,
      payload: data
    });
  };
}

export function getDefaultMapCoOrdinates() {
  return (dispatch) => {
    dispatch({
      type: GET_DEFAULT_LOCATION_COORDINATES
    });
  };
}