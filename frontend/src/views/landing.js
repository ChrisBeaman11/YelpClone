import React, { useEffect } from "react";
import LocationPane from "../components/LocationPane";
import { fetchAllLocations } from "../store/locations";
import { useDispatch, useSelector } from "react-redux";
import './landing.css';
export default function Landing(){
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchAllLocations());
    }, [dispatch]);

    const locations = useSelector((state) => Object.values(state.locations.allLocations));
    return(
  <div className="landingPage">
    <h2 className="landingHeader">Review any of our listed restaurants below.</h2>
        <div className="GridContainer">

            {locations.map((location, i) => {
          return <LocationPane key={i} location={location} />;
        })}
        </div>
        </div>
    );

}
