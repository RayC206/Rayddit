import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { createPostRequest } from "../../store/posts";
import "./CreatePost.css";

const CreatePost = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [linkUrl, setLinkUrl] = useState(null);
  const [text, setText] = useState(null);
  // const [subreddit, setSubreddit] = useState("");
  // const [postType, setPostTyoe] = useState("");
  const [errors, setErrors] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  if (submitSuccess) {
    return <Redirect to="/" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    let newPostData = {
      title: title,
      imageUrl: imageUrl,
      linkUrl: linkUrl,
      text: text,
      subreddit: 1,
      postType: 1,
    };
    return dispatch(createPostRequest(newPostData))
      .then(async (res) => {
        setSubmitSuccess(true);
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data) {
          if (data.errors) {
            setErrors(data.errors);
          } else if (data.message) {
            setErrors([data.message]);
          }
        }
      });
  };

  return (
    <div className="formContainer">
      <form className="postsCreate" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error,idx) => (
            <li key= {idx}>{error}</li>
          ))}
        </ul>
        <h1 className="createSpotTitle">Create Post</h1>
        <label className="createTitle">
          <span>Title:</span>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange ={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label className="createTitle">
          <span>Image URL:</span>
          <input
            type="text"
            placeholder="Image URL"
            value={imageUrl}
            onChange ={(e) => setImageUrl(e.target.value)}

          />
        </label>
        <label className="createTitle">
          <span>Link URL:</span>
          <input
            type="text"
            placeholder="Link URL"
            value={linkUrl}
            onChange ={(e) => setLinkUrl(e.target.value)}

          />
        </label>
        <label className="createTitle">
          <span>Text:</span>
          <input
            type="text"
            placeholder="text"
            value={text}
            onChange ={(e) => setText(e.target.value)}

          />
        </label>
      </form>
    </div>
  )

};

export default CreatePost
