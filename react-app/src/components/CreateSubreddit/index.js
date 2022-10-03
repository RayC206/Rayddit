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
  const [bannerImage, setBannerImage] = useState("" || "https://www.redditinc.com/assets/images/blog/_1000x483_crop_center-center_none/upvoted_banner-green-plain_2021-08-25-191050_tsgv.jpg");
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
    <div className="subredditFormContainer">
      <form className="subredditForm" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error,idx) =>(
            <li key={idx}>
              {error}
            </li>
          ))}
        </ul>
        <label>
          <span>Name:</span>
          <input
            type = "text"
            placeholder = "name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Description:</span>
          <input
            type = "text"
            placeholder = "Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          <span>Icon URL:</span>
          <input
            type = "text"
            placeholder = "Icon Url"
            value={iconUrl}
            onChange={(e) => setIconUrl(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Banner Image URL:</span>
          <input
            type = "text"
            placeholder = "Banner Image URL"
            value={bannerImage}
            onChange={(e) => setBannerImage(e.target.value)}
          />
        </label>
        <button className="createSubredditButton" type="submit">
            Create new Subreddit
          </button>
      </form>
    </div>
  )
}

export default CreateSubreddit;
