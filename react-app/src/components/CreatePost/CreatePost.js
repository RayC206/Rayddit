import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { createPostRequest } from "../../store/posts";
import "./CreatePost.css";

const CreatePost = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [linkUrl, setLinkUrl] = useState(null);
  const [text, setText] = useState(null);
  const [subreddit, setSubreddit] = useState(1);
  const [postType, setPostTyoe] = useState(1);
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
      img_url: imageUrl,
      link_url: linkUrl,
      text: text,
      subreddit_id: subreddit,
      post_type_id: postType,
    };
    console.log("NEW POST DATA");
    console.log(newPostData);
    return dispatch(createPostRequest(newPostData))
      .then(async (res) => {
        console.log("RESPONSE");
        console.log(res);
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
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <h1 className="createSpotTitle">Create Post</h1>
        <label className="createTitle">
          <span>Title:</span>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label className="createTitle">
          <span>Image URL:</span>
          <input
            type="text"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </label>
        <label className="createTitle">
          <span>Link URL:</span>
          <input
            type="text"
            placeholder="Link URL"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
          />
        </label>
        <label className="createTitle">
          <span>Text:</span>
          <input
            type="text"
            placeholder="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </label>
        {/* <label className="createSubreddit">
          <span>Subreddit:</span>
          <input
            type="text"
            placeholder="Subreddit"
            value={subreddit}
            // onChange={(e) => setPreviewImage(e.target.value)}
          />
        </label> */}
        {/* <label className="createPostType">
          <span>Post Type:</span>
          <input
            type="text"
            placeholder="Post Type"
            value={postType}
            // onChange={(e) => setPreviewImage(e.target.value)}
          />
        </label> */}
        <button className="createSpotButton" type="submit">
          Create new post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
