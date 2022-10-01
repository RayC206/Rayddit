import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getSubredditRequest } from "../../store/subreddits";
import { getAllSubredditsPostsRequest } from "../../store/posts";
import "./Subreddit.css";

import { downvotePostRequest, upvotePostRequest } from "../../store/posts";

const SubredditPage = () => {
  const POST_TYPE_TEXT = 1;
  const POST_TYPE_IMAGE = 2;
  const POST_TYPE_LINK = 3;

  const dispatch = useDispatch();
  const history = useHistory();
  let { subredditId } = useParams();
  subredditId = Number(subredditId);
  const subredditInfo = useSelector((state) => Object.values(state.subreddits));
  const posts = useSelector((state) => Object.values(state.posts));

  const [subredditLoaded, setSubredditLoaded] = useState(false);
  const [postsLoaded, setPostsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getSubredditRequest(subredditId)).then(() => {
      setSubredditLoaded(true);
    });
    dispatch(getAllSubredditsPostsRequest(subredditId)).then(() => {
      setPostsLoaded(true);
    });
  }, [dispatch]);

  const upvotePost = (postId) => {
    dispatch(upvotePostRequest(postId));
  };

  const downvotePost = (postId) => {
    dispatch(downvotePostRequest(postId));
  };

  const postDetailPage = (postId) => {
    let path = `/posts/${postId}`;
    history.push(path);
  };

  const createPostPage = () => {
    let path = `/submit`;
    history.push(path);
  };

  const usersProfilePage = (userId) => {
    let path = `/user/${userId}`;
    history.push(path);
  };

  return (
    <div className="pageContainer">
      {subredditLoaded &&
        subredditInfo.map((subreddit) => {
          return (
            <div className="subredditBanner">
              <img src={subreddit.banner_img}></img>
              <div className="subredditTitle"></div>
              {/* <div>{subreddit.name}</div> */}
              {/* <div>{subreddit.created_at}</div>
              <div>{subreddit.description}</div>
            <img src={subreddit.icon_url}></img> */}
            </div>
          );
        })}
      <div className="homePageDiv">
        <div className="rowOne">
          <div className="createPostDiv">
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
                      <button onClick={() => upvotePost(post.id)}>Up</button>
                      {post.total_votes}
                      <button onClick={() => downvotePost(post.id)}>
                        Down
                      </button>
                    </div>
                    <div
                      className="postContainer"
                      // onClick={(e) => postDetailPage(post.id)}
                    >
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
          {subredditLoaded &&
            subredditInfo.map((subreddit) => {
              return (
                <>
                  <div className="subredditSuggestions"></div>
                  <div className="createSubreddit"></div>
                </>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default SubredditPage;
