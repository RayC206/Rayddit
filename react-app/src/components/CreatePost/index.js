import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { createPostRequest } from "../../store/posts";
import "./CreatePost.css";

const CreatePost = () => {
  const POST_TYPE_TEXT = 1;
  const POST_TYPE_IMAGE = 2;
  const POST_TYPE_LINK = 3;

  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [linkUrl, setLinkUrl] = useState(null);
  const [text, setText] = useState(null);
  const [subreddit, setSubreddit] = useState(1);
  const [postType, setPostType] = useState(1);
  const [errors, setErrors] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  if (submitSuccess) {
    return <Redirect to="/" />;
  }

  const selectPostType = (postType) => {
    console.log(postType);
    setPostType(postType);
  };

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
    return dispatch(createPostRequest(newPostData)).then(async (res) => {
      if (!res.errors) {
        setSubmitSuccess(true);
      } else {
        setErrors(Object.values(res.errors));
      }
    });
  };

  return (
    <div className="formContainer">
      <ul>
        {errors.map((error, idx) => (
          <li className="createPost_li" key={idx}>
            {error}
          </li>
        ))}
      </ul>
      <h1 className="createSpotTitle">Create Post</h1>
      {/* post type radio buttons */}
      <div>
        <div className="createPostType">
          <button
            onClick={() => {
              selectPostType(POST_TYPE_TEXT);
            }}
          >
            Text
          </button>
          <button
            onClick={() => {
              selectPostType(POST_TYPE_IMAGE);
            }}
          >
            Image
          </button>
          <button
            onClick={() => {
              selectPostType(POST_TYPE_LINK);
            }}
          >
            Link
          </button>
        </div>
      </div>
      <br />

      {postType === POST_TYPE_TEXT && (
        <form className="postsCreate" onSubmit={handleSubmit}>
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
            <span>Text:</span>
            <input
              type="text"
              placeholder="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </label>

          <button className="createSpotButton" type="submit">
            Create new post
          </button>
        </form>
      )}

      {postType === POST_TYPE_IMAGE && (
        <form className="postsCreate" onSubmit={handleSubmit}>
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
          <button className="createSpotButton" type="submit">
            Create new post
          </button>
        </form>
      )}

      {postType === POST_TYPE_LINK && (
        <form className="postsCreate" onSubmit={handleSubmit}>
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
            <span>Link URL:</span>
            <input
              type="text"
              placeholder="Link URL"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
            />
          </label>
          <button className="createSpotButton" type="submit">
            Create new post
          </button>
        </form>
      )}

      {/* <label className="createSubreddit">
          <span>Subreddit:</span>
          <input
            type="text"
            placeholder="Subreddit"
            value={subreddit}
            // onChange={(e) => setPreviewImage(e.target.value)}
          />
        </label> */}
    </div>
  );
};

export default CreatePost;
