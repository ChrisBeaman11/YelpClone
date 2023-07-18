import React from "react";
import {useHistory} from "react-router-dom";
import './index.css';
export default function LocationPane(props){
    let location = props.location;
    let history = useHistory();
    if(!location) return null;
    let id = location.id;
    return(
        <div
          className="paneContainer"
          onClick={() => {
            history.push(`/locations/${id}`);
          }}
          title={location.name}
        >
          <img
            className="paneImage"
            src={location.previewImage}
            alt="photo unavailable"
          />
          <div className="firstLinePane">
            <div className="location">
              <p>{location.city},</p>
              <p>{location.state}</p>
            </div>
            <p>
              <i className="fas fa-star"></i> {location.avgRating?location.avgRating.toFixed(2) : "New"}
            </p>
          </div>
          </div>
    )
}
