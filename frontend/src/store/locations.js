import { csrfFetch } from "./csrf";

export const LOAD_ALL_LOCATIONS = "locations/LOAD_ALL_LOCATIONS";
export const RECEIVE_LOCATION = "locations/RECEIVE_Location";
export const RECEIVE_NEW_LOCATION = "locations/RECEIVE_NEW_LOCATION";
export const UPDATE_LOCATION = "locations/UPDATE_LOCATION";
export const REMOVE_LOCATION = "locations/REMOVE_LOCATION";
export const UPDATE_REVIEW = "locations/UPDATE_REVIEW";
export const UPDATE_REVIEW_POST = "locations/UPDATE_REVIEW_POST";

export const updateReviewPost = (avgRating) =>({
  type: UPDATE_REVIEW_POST,
  avgRating
})
export const updateReview = (avgRating) =>({
  type: UPDATE_REVIEW,
  avgRating
})
export const loadAllLocations = (locations) => ({
    type: LOAD_ALL_LOCATIONS,
    locations,
  });
  export const receiveLocation = (location) => ({
    type: RECEIVE_LOCATION,
    location,
  });
  export const receiveNewLocation = (location) => ({
    type: RECEIVE_NEW_LOCATION,
    location,
  });
  export const updateLocation = (location) => ({
    type: UPDATE_LOCATION,
    location,
  });
  export const removeLocation = (locationId) => ({
    type: REMOVE_LOCATION,
    locationId,
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

  export const createSingleLocation = (location, images) => async (dispatch) => {
    try {
      const response = await csrfFetch(`/api/locations`, {
        method: "POST",
        body: JSON.stringify(location),
      });

      if (response.ok) {
        const createdLocation = await response.json();
        createdLocation.LocationImages = [];
        for(let image of images){
          await csrfFetch(`/api/locations/${createdLocation.id}/images`, {method: "POST", body: JSON.stringify({url: image})})
          createdLocation.LocationImages.push({url: image});
        }

        dispatch(receiveNewLocation(createdLocation));
        return createdLocation.id;
      }
    } catch (err) {
      console.log("Failed to create the location:", err);
    }
  };

  export const updateSingleLocation = (location) => async (dispatch) => {
    try {
      const response = await csrfFetch(`/api/locations/${location.id}`, {
        method: "PUT",
        body: JSON.stringify(location),
      });
      if (response.ok) {
        const updated = await response.json();
        dispatch(receiveNewLocation(updated));
      }
    } catch (err) {
      console.log("Failed to create the location:", err);
    }
  };

  export const deleteSingleLocation = (id) => async (dispatch) => {
    try {
      const response = await csrfFetch(`/api/locations/${id}`, { method: "DELETE" });
      if (response.ok) {
        const location = await response.json();
        dispatch(removeLocation(id));

      }
    } catch (err) {
      console.log("Failed to fetch the location:", err);
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
        case RECEIVE_NEW_LOCATION:
      let as = state.allLocations;
      as[action.location.id] = action.location;
      return { allLocations: as, selectedLocation: action.location };
      case UPDATE_LOCATION:
      let all = state.allLocations;
      all[action.location.id] = action.location;
      return { ...state, allLocations: all };
      case REMOVE_LOCATION:
      return {...state, allLocations: {...state.allLocations, [action.locationId]: null}};
      case UPDATE_REVIEW:
      return {allLocations: state.allLocations, selectedLocation: {...state.selectedLocation, numReviews: state.selectedLocation.numReviews-1, avgStarRating: action.avgRating}}
      case UPDATE_REVIEW_POST:
      return {allLocations: state.allLocations, selectedLocation: {...state.selectedLocation, numReviews: state.selectedLocation.numReviews+1, avgStarRating: action.avgRating}}
      default:
        return state;
    }
  };

  export default locationsReducer;
