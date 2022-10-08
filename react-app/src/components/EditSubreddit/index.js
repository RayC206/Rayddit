import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  editSubredditRequest,
  getSubredditRequest,
} from "../../store/subreddits";

import "./EditSubreddit.css";

const EditSubreddit = ({ onClose }) => {
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
  }, [dispatch, subredditId]);

  if (submitSuccess) {
    onClose();
    // return <Redirect to={`/r/${subreddit.id}`} />;
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
        <div className="innerEditSubredditFormContainer">
          <form className="subredditEditForm" onSubmit={handleSubmit}>
            <div className="editSubredditFormTitle">
              <span>Edit Subreddit:</span>
            </div>
            <ul>
              {errors.map((error, idx) => (
                <li className="errorDiv" key={idx}>
                  {error}
                </li>
              ))}
            </ul>
            <div className="editFormInputContainer">
              <span>Description:</span>
              <label>
                <textarea
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>
              <span>Icon URL:</span>
              <label>
                <input
                  type="text"
                  placeholder="(Optional)"
                  value={iconUrl}
                  onChange={(e) => setIconUrl(e.target.value)}
                />
              </label>
              <span>Banner Image URL:</span>
              <label>
                <input
                  type="text"
                  placeholder="(Optional)"
                  value={bannerImage}
                  onChange={(e) => setBannerImage(e.target.value)}
                />
              </label>
            </div>
            <div className="editSubredditButtonDiv">
              <button className="editSubredditButton" type="submit">
                Edit Post
              </button>
            </div>
          </form>
        </div>
        <div className="outerEditSubredditPreview">
          <div className="editSubredditPreviewTitle">
            <span>Live Edit Preview:</span>
          </div>
          <div className="editSubredditPreview">
            <div className="innerSubredditPreview">
              <div className="editBannerPreview">
                <img
                  src={bannerImage}
                  alt='bannerImage'
                  onError={(e) => {
                    e.currentTarget.src = "https://i.imgur.com/aQxmKOg.png";
                  }}
                ></img>
              </div>
              <div className="editSubredditIconPreview">
                <div className="editIconBackground">
                  <img
                    src={iconUrl}
                    alt='iconImage'
                    onError={(e) => {
                      e.currentTarget.src = "https://i.imgur.com/hkMSod3.png";
                    }}
                  ></img>
                </div>
              </div>
            </div>
          </div>
          <div className="editSubredditPreviewNote">
            <span>
              *Empty / Broken images will recieve a default icon and banner
            </span>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default EditSubreddit;
