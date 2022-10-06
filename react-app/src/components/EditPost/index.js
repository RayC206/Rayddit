import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, Redirect } from "react-router-dom";
import { editPostRequest, getPostRequest } from "../../store/posts";
import "./EditPost.css";

const EditPost = () => {
  const POST_TYPE_TEXT = 1;
  const POST_TYPE_IMAGE = 2;
  const POST_TYPE_LINK = 3;

  let { postId } = useParams();
  postId = Number(postId);
  const dispatch = useDispatch();
  let post = useSelector((state) => Object.values(state.posts));
  post = post[0] ? post[0] : post;

  const sessionUser = useSelector((state) => state.session.user);
  const [postLoaded, setPostLoaded] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [imageUrl, setImageUrl] = useState(post.img_url);
  const [linkUrl, setLinkUrl] = useState(post.link_url);
  const [text, setText] = useState(post.text);
  const [subreddit, setSubreddit] = useState(1);
  const [postType, setPostType] = useState(1);
  const [errors, setErrors] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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
  }, [dispatch, postId]);

  if (submitSuccess) {
    return <Redirect to={`/user/${sessionUser.id}`} />;
  }
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
    // console.log("NEW POST DATA");
    // console.log(editedPostData);
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
      <div className="editPostFormPageContainer">
        <div className="innerEditPostFormPageContainer">
          <div className="editPostFormContainer">
            <div className="editPostFormTitle">
              <span className="editFormTitle">Edit Post:</span>
            </div>
            <form className="postEditForm" onSubmit={handleSubmit}>
              <ul>
                {errors.map((error, idx) => (
                  <li className="errorDiv" key={idx}>
                    {error}
                  </li>
                ))}
              </ul>
              <div className="innerPostEditContainer">
                <label>
                  <span className="editFormTitleSpan">Title:</span>
                  <input
                    className="createTitleInputBox"
                    type="text"
                    placeholder="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </label>
                {postType === POST_TYPE_IMAGE && (
                  <label>
                    <span className="editFormTitleSpan">Image:</span>
                    <input
                      className="createTitleInputBox"
                      type="text"
                      placeholder="Image URL"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                    />
                  </label>
                )}

                {postType === POST_TYPE_LINK && (
                  <label>
                    <span className="editFormTitleSpan">Link URL:</span>
                    <input
                      className="createTitleInputBox"
                      type="text"
                      placeholder="Link URL"
                      value={linkUrl}
                      onChange={(e) => setLinkUrl(e.target.value)}
                    />
                  </label>
                )}
                {postType === POST_TYPE_TEXT && (
                  <label>
                    <span className="editFormTitleSpan">Text:</span>
                    <textarea
                      className="createTextInputBox"
                      type="text"
                      placeholder="Text"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                  </label>
                )}

                <div className="editPostFormButton">
                  <button type="submit">Edit Post</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="editPreviewContainer">
          <div className="editPreviewSpanDiv">
            <span>Live Edit Preview:</span>
          </div>
          {postType === POST_TYPE_TEXT && (
            <div className="editPreviewContent">
              <div className="editPreviewTitle">
                <span>"{title}"</span>
              </div>
              <div className="editPreviewText">
                <span>"{text}"</span>
              </div>
            </div>
          )}
          {postType === POST_TYPE_IMAGE && (
            <div className="editPreviewContent">
              <div className="editPreviewTitle">
                <span>"{title}"</span>
              </div>
              <div className="editPreviewImage">
                <img src={imageUrl}></img>
              </div>
            </div>
          )}
          {postType === POST_TYPE_LINK && (
            <div className="editPreviewContent">
              <div className="editPreviewTitle">
                <span>"{title}"</span>
              </div>
              <div className="editPreviewLink">
                <a href={linkUrl}>{linkUrl}</a>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default EditPost;
