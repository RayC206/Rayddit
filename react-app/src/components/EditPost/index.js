import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { editPostRequest, getPostRequest } from "../../store/posts";

const EditPost = () => {
  let { postId } = useParams();
  postId = Number(postId);
  const dispatch = useDispatch();
  let post = useSelector((state) => Object.values(state.posts));
  post = post[0] ? post[0] : post;

  const [postLoaded, setPostLoaded] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [imageUrl, setImageUrl] = useState(post.img_url);
  const [linkUrl, setLinkUrl] = useState(post.link_url);
  const [text, setText] = useState(post.text);
  const [subreddit, setSubreddit] = useState(1);
  const [postType, setPostType] = useState(1);
  const [errors, setErrors] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  console.log("here");
  console.log(title);

  useEffect(() => {
    if (post.title) {
      setTitle(post.title);
      setImageUrl(post.img_url);
      setLinkUrl(post.link_url);
      setText(post.text);
      setSubreddit(post.subreddit_id);
      setPostType(post.post_type_id);
    }
  }, [post]);

  useEffect(() => {
    dispatch(getPostRequest(postId)).then(() => {
      setPostLoaded(true);
    });
  }, [dispatch]);

  const handleSubmit = (e) => {
    console.log("SUBMIT");
    e.preventDefault();
    setErrors([]);
    let editedPostData = {
      id: postId,
      title: title,
      img_url: imageUrl,
      link_url: linkUrl,
      text: text,
      subreddit_id: subreddit,
      post_type_id: postType,
    };
    console.log("NEW POST DATA");
    console.log(editedPostData);
    return dispatch(editPostRequest(editedPostData)).then(async (res) => {
      if (!res.errors) {
        // error handling
        setSubmitSuccess(true);
      } else {
        setErrors(Object.values(res.errors));
      }
    });
  };

  if (postLoaded) {
    return (
      <div className="editPostFormContainer">
        <form className="postEditForm" onSubmit={handleSubmit}>
          <ul>
            <div className="editPostFormTitle"> Edit Post:</div>
            {errors.map((error, idx) => (
              <li className="editPost_li" key={idx}>
                {error}
              </li>
            ))}
          </ul>
          <label>
            <span>title:</span>
            <input
              type="text"
              placeholder="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <label>
            <span>Image URL:</span>
            <input
              type="text"
              placeholder="Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </label>
          <label>
            <span>Link URL:</span>
            <input
              type="text"
              placeholder="Link URL"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
            />
          </label>
          <label>
            <span>Text:</span>
            <input
              type="text"
              placeholder="Text"
              value={text}
              onChange={(e) => setText(e.target.value)}
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

export default EditPost;
