import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getSubredditRequest } from "../../store/subreddits";
import "./PostDetails.css";
import {
  TiArrowUpOutline,
  TiArrowUpThick,
  TiArrowDownOutline,
  TiArrowDownThick,
} from "react-icons/ti";

import {
  downvotePostRequest,
  getPostRequest,
  upvotePostRequest,
} from "../../store/posts";

const PostDetails = () => {
  const POST_TYPE_TEXT = 1;
  const POST_TYPE_IMAGE = 2;
  const POST_TYPE_LINK = 3;

  let { postId } = useParams();
  postId = Number(postId);
  let { subredditId } = useParams();
  subredditId = Number(subredditId);
  const dispatch = useDispatch();
  const history = useHistory();
  const subredditInfo = useSelector((state) => Object.values(state.subreddits));
  const post = useSelector((state) => Object.values(state.posts));
  console.log("POST");
  console.log(post[0]);

  const [subredditLoaded, setSubredditLoaded] = useState(false);
  const [postLoaded, setPostLoaded] = useState(false);

  useEffect(() => {
    dispatch(getSubredditRequest(subredditId)).then(() => {

      setSubredditLoaded(true);
    });
    dispatch(getPostRequest(postId)).then(() => {
      setPostLoaded(true);
    });
  }, [dispatch]);

  const upvotePost = (postId) => {
    dispatch(upvotePostRequest(postId));
  };

  const downvotePost = (postId) => {
    dispatch(downvotePostRequest(postId));
  };

  const usersProfilePage = (userId) => {
    let path = `/user/${userId}`;
    history.push(path);
  };

  const createPostPage = () => {
    let path = `/submit`;
    history.push(path);
  };


  return (
    <div className="pageContainer">
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
                  <div
                    className="outerPostContainer outerPostDetailContainer"
                    key={post.id}
                  >
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
                    <div
                      className="postDetailContainer"
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
                        // onClick={(e) => postDetailPage(post.id)}
                      >
                        {(() => {
                          if (post.post_type_id === POST_TYPE_TEXT) {
                            return <div className="postText">{post.text}</div>;
                          } else if (post.post_type_id === POST_TYPE_IMAGE) {
                            return (
                              <img
                                className="postImage postDetailImage"
                                src={post.img_url}
                              />
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
        {postLoaded &&
            post.map((subreddit) => {
              return (
                <>
                  <div className="subredditInformation">
                    <div className="aboutSubreddit">
                      <span>About Community</span>
                    </div>
                    <div className="subredditDescriptionDiv">
                      <div className="subredditDescription">{subreddit.description}</div>
                      {/* <div className="subredditBornDate">{subreddit.created_at}</div> */}
                    </div>
                      <div className="subredditCreatePostDiv">
                        <a className="createSubredditPost" onClick={createPostPage}> create post</a>
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
