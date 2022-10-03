import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Redirect } from "react-router-dom";
import {
  editSubredditRequest,
  getSubredditRequest,
} from "../../store/subreddits";

import './EditSubreddit.css'

const EditSubreddit = () => {
  let { subredditId } = useParams();
  subredditId = Number(subredditId);
  const dispatch = useDispatch();
  let subreddit = useSelector((state) => Object.values(state.subreddits));
  subreddit = subreddit[0] ? subreddit[0] : subreddit;
  const [description, setDescription] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [errors, setErrors] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [subredditLoaded, setSubredditLoaded] = useState(false);
  console.log(subreddit.name);

  useEffect(() => {
    if (subreddit.name) {
      setDescription(subreddit.description);
      setIconUrl(subreddit.icon_url);
      setBannerImage(subreddit.banner_img);
    }
  }, [subreddit]);

  useEffect(() => {
    dispatch(getSubredditRequest(subredditId)).then(() => {
      setSubredditLoaded(true);
    });
  }, [dispatch]);

  if (submitSuccess) {
    return <Redirect to={`/r/${subreddit.id}`} />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    let editedSubredditData = {
      id: subredditId,
      name: subreddit.name,
      description: description,
      icon_url: iconUrl,
      banner_img: bannerImage,
    };
    return dispatch(editSubredditRequest(editedSubredditData)).then(
      async (res) => {
        if (!res.errors) {
          setSubmitSuccess(true);
        } else {
          setErrors(Object.values(res.errors));
        }
      }
    );
  };

  if (subredditLoaded) {
    return (
      <div className="editSubredditFormContainer">
        <form className="subredditEditForm" onSubmit={handleSubmit}>
          <ul>
            <div className="editSubredditFormTitle">Edit Subreddit</div>
            {errors.map((error, idx) => (
              <li className="editPost_li" key={idx}>
                {error}
              </li>
            ))}
          </ul>
          <label>
            <span>Description:</span>
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label>
            <span>Icon URL:</span>
            <input
              type="text"
              placeholder="Icon image URL"
              value={iconUrl}
              onChange={(e) => setIconUrl(e.target.value)}
            />
          </label>
          <label>
            <span>Banner Image URL:</span>
            <input
              type="text"
              placeholder="Banner Image URL"
              value={bannerImage}
              onChange={(e) => setBannerImage(e.target.value)}
            />
          </label>
          <div className="editProfileButton">
            <button className="editProfileButton" type="submit">
              Edit Post
            </button>
          </div>
        </form>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default EditSubreddit;
