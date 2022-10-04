import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { createPostRequest } from "../../store/posts";
import icon from './icon.png'
import {
  getAllUsersSubredditsRequest,
  getAllSubredditsRequest,
} from "../../store/subreddits";
import "./CreatePost.css";

const CreatePost = () => {
  const POST_TYPE_TEXT = 1;
  const POST_TYPE_IMAGE = 2;
  const POST_TYPE_LINK = 3;

  const dispatch = useDispatch();
  const subreddits = useSelector((state) => Object.values(state.subreddits));
  // const urlParams = new URLSearchParams(window.location.search);
  // let subredditId = Number(urlParams.get("subreddit_id"));
  // subredditId = subredditId > 0 ? subredditId : 1;

  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [linkUrl, setLinkUrl] = useState(null);
  const [text, setText] = useState(null);
  const [subreddit, setSubreddit] = useState(1);
  const [postType, setPostType] = useState(1);
  const [errors, setErrors] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [subredditsLoaded, setSubredditsLoaded] = useState(false);

  useEffect(() => {
    // dispatch(getAllUsersSubredditsRequest()).then(() => {
    //   setSubredditsLoaded(true);
    // });
    dispatch(getAllSubredditsRequest()).then(() => {
      setSubredditsLoaded(true);
    });
  }, [dispatch]);

  if (submitSuccess) {
    return <Redirect to="/" />;
  }

  const selectPostType = (postType) => {
    setPostType(postType);
  };

  const handleSubredditChange = (e) => {
    setSubreddit(e.target.value);
    console.log(subreddit);
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
    <div className="formPageContainer">
      <div className="formContainer">
        <div className="createPostTitle">Create a Post</div>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div className="subredditDropdownDiv">
          <select className="subredditDropdownSelect"onChange={handleSubredditChange}>
            {subredditsLoaded &&
              subreddits.map((subreddit) => {
                return (
                  <option key={subreddit.id} value={subreddit.id}>
                   r/{subreddit.name}
                  </option>
                );
              })}
          </select>
        </div>
        {/* post type radio buttons */}
        <div className="mainFormContainer">
          <div>
            <div className="createPostType">
              <button
              className="createButtonText"

                onClick={() => {
                  selectPostType(POST_TYPE_TEXT);
                }}
              >
                Text
              </button>
              <button
              className="createButtonImage"
                onClick={() => {
                  selectPostType(POST_TYPE_IMAGE);
                }}
              >
                Image
              </button>
              <button
                className="createButtonLink"
                onClick={() => {
                  selectPostType(POST_TYPE_LINK);
                }}
              >
                Link
              </button>
            </div>
          </div>
          <br />
          <div className="createInputBoxes">
            {postType === POST_TYPE_TEXT && (
              <form className="postsCreate" onSubmit={handleSubmit}>
                <div>
                  <label className="createTitle">
                    <input
                      className="createTitleInputBox"
                      type="text"
                      placeholder="Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </label>
                </div>
                <div>
                  <label className="createTitle">
                    <textarea
                      className="createTextInputBox"
                      type="text"
                      placeholder="text"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                  </label>
                </div>
                <div className="createPostButtonDiv">
                  <button className="createPostButton" type="submit">
                    Create new post
                  </button>
                </div>
              </form>
            )}

            {postType === POST_TYPE_IMAGE && (
              <form className="postsCreate" onSubmit={handleSubmit}>
                <label className="createTitle">
                  <input
                    className="createTitleInputBox"
                    type="textarea"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </label>
                <label className="createTitle">
                  <input
                    className="createTitleInputBox"
                    type="text"
                    placeholder="Image URL"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                  />
                </label>
                <div className="createPostButtonDiv">
                  <button className="createPostButton" type="submit">
                    Create new post
                  </button>
                </div>
              </form>
            )}

            {postType === POST_TYPE_LINK && (
              <form className="postsCreate" onSubmit={handleSubmit}>
                <label className="createTitle">
                  <input
                    className="createTitleInputBox"
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </label>
                <label className="createTitle">
                  <input
                    className="createTitleInputBox"
                    type="text"
                    placeholder="Link URL"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                  />
                </label>
                <div className="createPostButtonDiv">
                  <button className="createPostButton" type="submit">
                    Create new post
                  </button>
                </div>
              </form>
            )}
          </div>
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
      </div>
      <div className="sideCreateContainer">
        <div className="postingRules">
        <img src={icon}></img>
        <span>Posting to Rayddit</span>
        </div>
        <ol >
          <li className="ruleList">Remember the human</li>
          <li className="ruleList">Behave like you would in real life</li>
          <li className="ruleList">Look for the original source of content</li>
          <li className="ruleList">Search for duplicates before posting</li>
          <li className="ruleList">Report any bugs to the delevoper</li>
        </ol>
      </div>
    </div>
  );
};

export default CreatePost;
