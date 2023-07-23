import React from "react";
import LocationForm from "../components/LocationForm";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function UpdateLocation() {
  let { locationId } = useParams();
  const allLocations = useSelector((state) => state.locations.allLocations);
  const getLocation = allLocations[locationId];
  return (
    <>
      <LocationForm location={getLocation} />
    </>
  );
}
