import React from "react";
import {useHistory} from "react-router-dom";
import './index.css';
import DeleteLocationPopout from "../DeleteLocationPopout";
import { useState } from "react";
export default function LocationPane(props){
  let [showDeleteModal, setShowDeleteModal] = useState(false);
    let location = props.location;
    let history = useHistory();
    if(!location) return null;
    let id = location.id;
    return(
      <>
      <div>
        <div
          className="paneContainer"

          title={location.name}
        >
          <div className="locationName">{location.name}</div>
          <img
          onClick={() => {
            history.push(`/locations/${id}`);
          }}
            className="paneImage"
            src={location.previewImage}
            alt="photo unavailable"
          />
          <div className="firstLinePane">
            <div className="location">
              <p>{location.city}, {location.state}</p>
            </div>
            <p>
              <i className="fas fa-star"></i> {location.avgStarRating?location.avgStarRating.toFixed(2) : "New"}
            </p>
          </div>
          </div>
           {props.footer ? (
            <div className= "manageButtonsDiv" style={{ display: "flex" }}>
              <button
              className= "manageButtons"
                onClick={() => {
                  history.push(`/locations/${location.id}/edit`);
                }}
              >
                Edit
              </button>
              <button
              className= "manageButtons"
                onClick={() => {
                  setShowDeleteModal(true);
                }}
              >
                Delete
              </button>
            </div>
          ) : null}
        {showDeleteModal ? (
          <DeleteLocationPopout location={location} setShowDeleteModal={setShowDeleteModal} />
          ) : null}
          </div>
      </>
    )
}
