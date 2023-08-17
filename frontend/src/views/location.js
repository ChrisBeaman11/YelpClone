import React, { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleLocation } from "../store/locations";
import { fetchAllReviewsByLocation } from "../store/reviews";
import PostReviewModal from "../components/PostReviewModal";
import "./location.css";
import DeleteReviewPopout from "../components/DeleteReviewPopout";

const getMonth = (date) => {
  let vari = new Date(date);
  return vari.toLocaleString('default', {month: 'long'});
}




export default function Location() {
  let { locationId } = useParams();
  const dispatch = useDispatch();

  let [showModal, setShowModal] = useState(false);
  let [showDeleteModal, setShowDeleteModal] = useState(null);

  const location = useSelector((state) => state.locations.selectedLocation);
  const reviews = useSelector((state) => state.reviews.reviews) || [];
  const sessionUser = useSelector((state) => state.session.user);



  useEffect(() => {
    dispatch(fetchSingleLocation(locationId));
    dispatch(fetchAllReviewsByLocation(locationId));
  }, [locationId]);

  if (!location) return null;
  const hasReview = reviews?.find((r) => r.User?.id===sessionUser?.id)
  const userOwnsLocation = sessionUser?.id === location.ownerId;
  let reviewText;
    if(location.numReviews===1){
        reviewText = "review"
    }
    else{
        reviewText = "reviews";
    }
  let rating = location.avgStarRating?`${location.avgStarRating?.toFixed(2)} · ${location.numReviews} ${reviewText}`:"New";
  return (
    <>
    <div className="detailsHead">
    <h2>Check out this restaurant and feel free to leave a review!</h2>
    <h3 className="about">About this restaurant</h3>
    <p className="descriptionTag">{location.description}</p>
    </div>
    <div className="outerCont">
      <div className="paneContainer">
        <h2 className="locationName">{location.name}</h2>
        {location.LocationImages && (
          <div className="locationImagesContainer">
            {location.LocationImages[0] && (
              <img className = "mainPreview"src={location.LocationImages[0].url} alt="PHOTO UNAVAILABLE" />
            )}

          </div>
        )}
        <div className="locationDiv">
          <h3>{location.city}, {location.state}, {location.country}</h3>
        </div>



        </div>
        <div className="reviewSide">
        <div className="ReviewContainer">
          <p className="ratingPTag">
            <i class="fas fa-star"></i> {rating}
          </p>

           { sessionUser && !userOwnsLocation && !hasReview&& <button
              onClick={() => {
                setShowModal(true);
              }}
              className="postReviewButton"
            >
             {reviews.length > 0 ? `Post your review`: 'Be the first to post a review!'}
            </button>}
<hr />
          {reviews.sort((a, b) => {
          let dateA = new Date(a.createdAt);
          let dateB = new Date(b.createdAt);
          return dateB - dateA;
        }).map((review, i) => {
            const isUsersReview = sessionUser?.id === review.User.id;
            return (
              <div className="reviewItem" key={i}>
                {review &&<>
                <div className= "reviewCont">
                <div className="name">{review.User.firstName}</div>
                <div className="date">{getMonth(review.createdAt) + ' ' + review.createdAt.split('T').join('').split('-')[0]}</div>
                <div className="review">{review.review}</div>
                </div>
                {isUsersReview&&<button className="deleteReviewButton"onClick={() => {

                setShowDeleteModal(review);
              }}>Delete</button>}

                </>}
                <hr />
              </div>
            );
          })}
        </div>
      </div>
      {showDeleteModal ? (
        <DeleteReviewPopout locationId={location.id}review={showDeleteModal} setShowDeleteModal={setShowDeleteModal} />
      ) : null}
      {showModal ? <PostReviewModal showModal={setShowModal} /> : null}

    </div>
    </>
  );
}
