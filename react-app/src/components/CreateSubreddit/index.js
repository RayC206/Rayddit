import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { createSubredditRequest } from "../../store/subreddits";
import "./CreateSubreddit.css";


const CreateSubreddit = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [errors, setErrors] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  if (submitSuccess) {
    return <Redirect to="/" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    let newSubredditData = {
      name: name,
      description: description,
      icon_url: iconUrl,
      banner_img: bannerImage
    };
    return dispatch(createSubredditRequest(newSubredditData)).then(async (res) => {
      if (!res.errors) {
        setSubmitSuccess(true);
      } else {
        setErrors(Object.values(res.errors));
      }
    });
  };

  return (
    <div className="subredditFormPageContainer">
    <div className="subredditFormContainer">
    <div className="createSubredditTitle">Create a Subreddit</div>
      <form className="subredditForm" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error,idx) =>(
            <li className="errorDiv" key={idx}>
              {error}
            </li>
          ))}
        </ul>
        <label>
          <span>Name:</span>
          <input
            className="createSubredditInput"
            type = "text"
            placeholder = "Subreddit name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Description:</span>
          <textarea
            className="createSubredditDescriptionInput"
            type = "text"
            placeholder = "Description (Optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          <span>Icon URL:</span>
          <input
          className="createSubredditInput"
            type = "text"
            placeholder = "Icon URL (Optional)"
            value={iconUrl}
            onChange={(e) => setIconUrl(e.target.value)}
          />
        </label>
        <label>
          <span>Banner Image URL:</span>
          <input
          className="createSubredditInput"
            type = "text"
            placeholder = "Banner Image URL (Optional)"
            value={bannerImage}
            onChange={(e) => setBannerImage(e.target.value)}
          />
        </label>
        <div className="createPostButtonDiv">
                  <button className="createPostButton" type="submit">
                    Create New Subreddit
                  </button>
                </div>
      </form>
    </div>
    </div>
  )
}

export default CreateSubreddit;
