import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getAllSubredditsRequest } from "../../store/subreddits";
import createIcon from "./createIcon.png";
import {
  TiArrowUpOutline,
  TiArrowUpThick,
  TiArrowDownOutline,
  TiArrowDownThick,
} from "react-icons/ti";
import "./Homepage.css";

import {
  downvotePostRequest,
  getAllPostsRequest,
  upvotePostRequest,
} from "../../store/posts";

const Homepage = () => {
  const POST_TYPE_TEXT = 1;
  const POST_TYPE_IMAGE = 2;
  const POST_TYPE_LINK = 3;

  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const subredditInfo = useSelector((state) => Object.values(state.subreddits));
  const posts = useSelector((state) => Object.values(state.posts));
  console.log("HERE___");
  console.log(subredditInfo);

  const [postsLoaded, setPostsLoaded] = useState(false);
  const [subredditLoaded, setSubredditLoaded] = useState(false);

  useEffect(() => {
    dispatch(getAllSubredditsRequest()).then(() => {
      setSubredditLoaded(true);
    });
    dispatch(getAllPostsRequest()).then(() => {
      setPostsLoaded(true);
    });
  }, [dispatch]);

  const upvotePost = (postId) => {
    dispatch(upvotePostRequest(postId));
  };

  const downvotePost = (postId) => {
    dispatch(downvotePostRequest(postId));
  };

  const createPostPage = () => {
    let path = `/submit`;
    history.push(path);
  };

  const postDetailPage = (postId) => {
    let path = `/posts/${postId}`;
    history.push(path);
  };

  const usersProfilePage = (userId) => {
    let path = `/user/${userId}`;
    history.push(path);
  };

  const subredditsPage = (subredditId) => {
    let path = `/r/${subredditId}`;
    history.push(path);
  };

  return (
    <div className="pageContainer">
      <div className="homePageDiv">
        <div className="rowOne">
          <div className="createPostDiv">
            <div className="createIcon">
              <img src={createIcon}></img>
            </div>
            <div className="createInputContainer">
              <input
                type="text"
                placeholder="Create Post"
                className="inputBox"
                onClick={createPostPage}
              />
            </div>
          </div>
          {postsLoaded ? (
            posts.length ? (
              posts.map((post) => {
                return (
                  <div className="outerPostContainer" key={post.id}>
                    <div className="voteDiv">
                      <TiArrowUpThick
                        className="thickUpvote"
                        onClick={() => upvotePost(post.id)}
                      />

                      {post.total_votes}
                      <TiArrowDownThick
                        className="thickDownvote"
                        onClick={() => downvotePost(post.id)}
                      />
                    </div>
                    <div className="postContainer">
                      <div className="postTopDescription">
                        <div className="postSubredditName">
                          r/{post.subreddit_name}
                        </div>
                        <div
                          className="postUsername"
                          onClick={(e) => usersProfilePage(post.user_id)}
                        >
                          u/{post.username}
                        </div>
                        <div className="postTimeago">
                          {post.created_at_timeago}
                        </div>
                      </div>
                      <div className="postTitle">{post.title}</div>
                      <div
                        className="postContent"
                        onClick={(e) => postDetailPage(post.id)}
                      >
                        {(() => {
                          if (post.post_type_id === POST_TYPE_TEXT) {
                            return <div className="postText">{post.text}</div>;
                          } else if (post.post_type_id === POST_TYPE_IMAGE) {
                            return (
                              <img className="postImage" src={post.img_url} />
                            );
                          } else if (post.post_type_id === POST_TYPE_LINK) {
                            return (
                              <a className="postLinkurl" href={post.link_url}>
                                {post.link_url}
                              </a>
                            );
                          }
                        })()}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>No posts yet</div>
            )
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <div className="rowTwo">
          <div className="homePageSubredditInfo">
            <div className="aboutSubreddit">
              <span>Recommended Communities</span>
            </div>
            {subredditLoaded &&
              subredditInfo.map((subreddit) => {
                return (
                  <>
                    <div
                      className="homepageSubredditDescriptionDiv"
                      onClick={(e) => subredditsPage(subreddit.id)}
                    >
                      <div className="homepageSubredditDescription">
                        <div className="homeSubredditIcon">
                          <img src={subreddit.icon_url}></img>
                        </div>
                        <div className="homeSubredditName">
                          {subreddit.name}
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
          {/* <div className="createSubreddit"></div> */}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
