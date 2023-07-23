import React from "react";
import { useHistory } from "react-router-dom";
import { deleteSingleLocation } from "../../store/locations";
import { useDispatch, useSelector } from "react-redux";
import './DeleteLocationPopout.css';

export default function DeleteLocationPopout(props) {
    let history = useHistory();
    let dispatch = useDispatch();
  return (
    <div className="deleteLocationModal">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to remove this location from the listings?</p>
      <button className="yesButton" onClick={async () => {
          await dispatch(deleteSingleLocation(props.location.id));
          props.setShowDeleteModal(false);
            }}>Yes (Delete Location)</button>
      <button className="noButton" onClick={()=>{ props.setShowDeleteModal(false)}}>No (Keep Location)</button>
    </div>
  );
}
