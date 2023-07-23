import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createSingleLocation, updateSingleLocation } from "../../store/locations";



export default function LocationForm({location, formType}){
    const history = useHistory();
    let dispatch = useDispatch();

    const [country, setCountry] = useState(location?.country || "");
    const [city, setCity] = useState(location?.city || "");
    const [state, setState] = useState(location?.state || "");
    const [description, setDescription] = useState(location?.description || "");
    const [name, setName] = useState(location?.name || "");

    const [previewImages, setPreviewImages] = useState("");
    const [previewImages2, setPreviewImages2] = useState("");
    const [previewImages3, setPreviewImages3] = useState("");
    const [previewImages4, setPreviewImages4] = useState("");
    const [previewImages5, setPreviewImages5] = useState("");

    const isUpdate = location!=null;
    const [inFlight, setInFlight] = useState(false);

    const [errors, setErrors] = useState({});
    const handleSubmit = async (e) => {
      e.preventDefault();
      if(Object.keys(errors).length > 0)return;
      setErrors({});
      const newLocation = {
        ...location,
        country,
        city,
        state,
        description,
        name
      };
      const images =
        [previewImages,
        previewImages2,
        previewImages3,
        previewImages4,
        previewImages5]


      if (isUpdate) {
        dispatch(updateSingleLocation(newLocation)).then(() =>
          history.push(`/locations/${location.id}`)
        );
      } else {
        dispatch(createSingleLocation(newLocation, images)).then((id) =>
          history.push(`/locations/${id}`)
        );
      }
    };


    useEffect(() => {
      let errorObj = {};

      if (!country.length) errorObj.country = "Country is required";
      if (!city.length) errorObj.city = "City is required";
      if (!state.length) errorObj.state = "State is required";
      if (description.length < 30)
        errorObj.description = "Description needs a minimum of 30 characters";
      if (!name.length) errorObj.name = "Name is required";

      if (!previewImages.length && !isUpdate) errorObj.previewImages = "Preview image 1 is required";
      for (let i = 0; i < previewImages.length; i++) {
        if (
          previewImages[i].indexOf(".png") !== -1 ||
          previewImages[i].indexOf(".jpeg") !== -1 ||
          previewImages[i].indexOf(".jpg") !== -1
        ) {
          errorObj.previewImages = "Image URL must end in .png. .jpg, or .jpeg";
        }
      }

      setErrors(errorObj);
    }, [
      country,
      city,
      state,
      description,
      name,
      previewImages,
    ]);
    return (
      <div>
        <div className="headerStuff">
      <h2>{isUpdate? 'Edit location': 'Create a new location'}</h2>
      <h3>Where's your place located?</h3>
      </div>
      <form onSubmit={handleSubmit} className="createLocationForm">
        <div className="FormContainer">
          <h2>{formType}</h2>
          <label>
            <div>
              Country {inFlight &&<div className="errors">{errors.country}</div>}
            </div>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </label>


          <div className="subFormContainer">
            <label>
              City {inFlight &&<div className="errors">{errors.city}</div>}
              <input value={city} onChange={(e) => setCity(e.target.value)} />
            </label>
            <label>
              State {inFlight &&<div className="errors">{errors.state}</div>}
              <input value={state} onChange={(e) => setState(e.target.value)} />
            </label>
          </div>

          <label>
            <div className="descriptionStuff">
            <h2>Describe your place to guests</h2>
            <p className="descriptionText">Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
            <textarea
              placeholder="Please write at least 30 characters"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            </div>
            {inFlight && <div className="errors">{errors.description}</div>}
          </label>

          <label>
            <div className="titleStuff">
            <h2>Create a title for your location</h2>
            <p>Catch guests' attention with a location title that highlights waht makes your place special.</p>
            <input placeholder = "Name of your location" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            {inFlight &&<div className="errors">{errors.name}</div>}
          </label>



          {!isUpdate && <label>
            <div className="photoStuff">
            <h2>Liven up your location with photos</h2>
            <p>Submit a link to at least one photo to publish your location.</p>
            <div className="previewImagesFields">
            <input
              placeholder="Preview Image 1"
              type = "text"
              value={previewImages}
              onChange={(e) => setPreviewImages(e.target.value)}
            />
            <input type="text" value={previewImages2}
            placeholder="Preview Image 2"
              onChange={(e) => setPreviewImages2(e.target.value)}/>
            <input type="text" value={previewImages3}
            placeholder="Preview Image 3"
              onChange={(e) => setPreviewImages3(e.target.value)}/>
            <input type="text" value={previewImages4}
            placeholder="Preview Image 4"
              onChange={(e) => setPreviewImages4(e.target.value)}/>
            <input type="text" value={previewImages5}
            placeholder="Preview Image 5"
              onChange={(e) => setPreviewImages5(e.target.value)}/>
              </div>
              </div>
            {inFlight &&<div className="errors">{errors.previewImages}</div>}
          </label>}
          <button
            // disabled={Object.keys(errors).length > 0}
            className="submitButton"
            type="submit"
            onClick={() => setInFlight(true)}
          >
            {isUpdate? 'Edit location': 'Create location'}
            {formType}
          </button>
        </div>
      </form>
      </div>
    );
}
