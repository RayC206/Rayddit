import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, Link } from "react-router-dom";
import { getSubredditRequest } from "../../store/subreddits";
import PostCard from "../PostCard";
import LoginFormModal from "../LoginFormModal";
import "./PostDetails.css";


import {
  getPostRequest,
  deletePostRequest,
} from "../../store/posts";
import ErrorPage from "../ErrorPage";

const PostDetails = () => {
  const POST_TYPE_TEXT = 1;
  const POST_TYPE_IMAGE = 2;
  const POST_TYPE_LINK = 3;

  let { postId } = useParams();
  postId = Number(postId);
  let subredditId;
  // subredditId = Number(subredditId);
  const dispatch = useDispatch();
  const history = useHistory();
  const subredditInfo = useSelector((state) => Object.values(state.subreddits));
  const post = useSelector((state) => Object.values(state.posts));
  const sessionUser = useSelector((state) => state.session.user);
  const [loginFormModalIsOpen, setIsLoginFormModalIsOpen] = useState(false);

  if (post && post.length) {
    subredditId = post[0].subreddit_id;
  }

  const [subredditLoaded, setSubredditLoaded] = useState(false);
  const [postLoaded, setPostLoaded] = useState(false);

  useEffect(() => {
    dispatch(getPostRequest(postId)).then(() => {
      setPostLoaded(true);
      subredditId &&
        dispatch(getSubredditRequest(subredditId)).then(() => {
          setSubredditLoaded(true);
        });
    });
  }, [dispatch, subredditId]);

  const subredditPage = (subredditId) => {
    let path = `/r/${subredditId}`;
    history.push(path);
  };

  const createPostPage = () => {
    if (!sessionUser) {
      setIsLoginFormModalIsOpen(true);
    } else {
      let path = `/submit`;
      history.push(path);
    }
  };

  const editPost = (postId) => {
    let path = `/posts/${postId}/edit`;
    history.push(path);
  };

  const deletePost = (postId) => {
    dispatch(deletePostRequest(postId));
  };

  const homePage = () => {
    let path = `/`;
    history.push(path);
  };

  return (
    <div className="pageContainer">
      <LoginFormModal
        isOpen={loginFormModalIsOpen}
        modalToggle={setIsLoginFormModalIsOpen}
      />
      <div className="homePageDiv">
        <div className="rowOne">
          {/* <div className="createPostDiv">
          <div className="createInputContainer">
            <input
              type="text"
              placeholder="Create Post"
              className="inputBox"
              onClick={createPostPage}
            />
          </div>
        </div> */}
          {postLoaded ? (
            post.length ? (
              post.map((post) => {
                return (
                  <>
                    {sessionUser.id == post.user_id && (
                      <div className="editDeletePostButtonDiv">
                        <button
                          className="editPostButton"
                          onClick={() => {
                            editPost(post.id);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="deletePostButton"
                          onClick={() => {
                            deletePost(post.id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                    <PostCard post={post} />
                  </>
                );
              })
            ) : (
              <div className="postNotExist">
                <h1>Post deleted / does not exist</h1>
                <div className="goBackHome" onClick={homePage}>
                  <span>Go back to Homepage</span>
                  </div>
              </div>
            )
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <div className="rowTwo">
          {subredditLoaded &&
            subredditInfo.map((subreddit) => {
              return (
                <>
                  <div className="subredditInformation">
                    <div className="postPageAboutSubreddit">
                      <img
                        src={subreddit.banner_img}
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://i.imgur.com/aQxmKOg.png";
                        }}
                      ></img>
                    </div>
                    <div
                      className="postDescriptionSubredditLogo"
                      onClick={(e) => subredditPage(subreddit.id)}
                    >
                      <img
                        className="subredditLgo"
                        src={subreddit.icon_url}
                      ></img>
                      <span>r/{subreddit.name}</span>
                    </div>
                    <div className="subredditDescriptionDiv">
                      <div className="subredditDescription">
                        {subreddit.description}
                      </div>
                      {/* <div className="subredditBornDate">{subreddit.created_at}</div> */}
                    </div>
                    <div className="subredditCreatePostDiv">
                      <a
                        className="createSubredditPost"
                        onClick={createPostPage}
                      >
                        {" "}
                        create post
                      </a>
                    </div>
                  </div>
                  {/* <div className="createSubreddit"></div> */}
                </>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
