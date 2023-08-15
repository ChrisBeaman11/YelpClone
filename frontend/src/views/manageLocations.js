import { useState, useEffect } from "react";
import LocationPane from "../components/LocationPane";
import { useSelector } from "react-redux";
import { Suspense } from "react";
import Loading from "../components/Loading";
import './manageLocations.css';

export default function ManageLocations() {
  const allLocations = useSelector((state) => Object.values(state.locations.allLocations));
  const sessionUser = useSelector((state) => state.session.user);
  const userLocations = allLocations.filter((location) => {
    return location&&(location.ownerId === sessionUser.id);
  });

  return (
    <Suspense fallback={<Loading />}>
      <div className="manageCont">
        <h2 className="header">Manage Your Restaurants</h2>
        <p className="des">Here you can edit your existing restaurants details or delete an existing restaurant off of the site.</p>
      <div className="GridContainer">
        {userLocations.map((location) => {
          return <LocationPane key={location.id} location={location} footer={true} />;
        })}
      </div>
      </div>
    </Suspense>
  );
}
