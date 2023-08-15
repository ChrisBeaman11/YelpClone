import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Signup from "./views/signup";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Landing from "./views/landing";
import Login from "./views/login";
import Location from "./views/location";
import CreateLocation from "./views/createLocationForm";
import UpdateLocation from "./views/updateLocation";
import ManageLocations from "./views/manageLocations";
import Footer from "./components/Footer";
import './index.css'
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
    <div className="app">
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path = "/">
        <Landing/>
          </Route>
            <Route exact path="/locations/new">
            <CreateLocation />
          </Route>
          <Route exact path="/locations/current">
            <ManageLocations />
          </Route>
          <Route exact path="/locations/:locationId/edit">
            <UpdateLocation />
          </Route>
          <Route exact path = "/locations/:locationId">
        <Location/>
          </Route>
        </Switch>
      )}
      <Footer></Footer>
      </div>
    </>
  );
}

export default App;
