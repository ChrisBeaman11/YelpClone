import React from "react";
import { deleteSingleReview } from "../../store/reviews";
import { useDispatch, useSelector } from "react-redux";
import './DeleteReviewPopout.css';

export default function DeleteReviewPopout(props) {
    let dispatch = useDispatch();

  return (
    <div className="deleteReviewModal">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to remove this review?</p>
      <button className="yesButton" onClick={async () => {
        props.setShowDeleteModal(null);
        await dispatch(deleteSingleReview(props.review.id, props.locationId));
            }}>Yes (Delete review)</button>
      <button className="noButton" onClick={()=>{ props.setShowDeleteModal(null)}}>No (Keep review)</button>
    </div>
  );
}
