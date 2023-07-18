import { csrfFetch } from "./csrf";

export const LOAD_ALL_LOCATIONS = "locations/LOAD_ALL_LOCATIONS";
export const RECEIVE_LOCATION = "spots/RECEIVE_Location";


export const loadAllLocations = (locations) => ({
    type: LOAD_ALL_LOCATIONS,
    locations,
  });
  export const receiveLocation = (location) => ({
    type: RECEIVE_LOCATION,
    location,
  });


  export const fetchAllLocations = () => async (dispatch) => {
    try {
      const response = await csrfFetch("/api/locations");
      if (!response.ok) {
        throw new Error("Failed to fetch locations");
      }
      const locations = await response.json();
      dispatch(loadAllLocations(locations));
    } catch (err) {
      console.log("Failed to fetch locations:", err);
    }
  };

  export const fetchSingleLocation = (id) => async (dispatch) => {
    try {
      const response = await csrfFetch(`/api/locations/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch single location");
      }
      const location = await response.json();
      dispatch(receiveLocation(location));
    } catch (err) {
      console.error("Failed to fetch the location:", err);
    }
  };

  const locationsReducer = (
    state = { allLocations: {}, selectedLocation: {} },
    action
  ) => {
    switch (action.type) {
      case LOAD_ALL_LOCATIONS:
        let allLocations = {};
        action.locations.Locations.map((location) => {
          let id = location["id"];
          allLocations[id] = location;
        });
        return { ...state, allLocations };
      case RECEIVE_LOCATION:
        return { ...state, selectedLocation: action.location };
      default:
        return state;
    }
  };

  export default locationsReducer;
