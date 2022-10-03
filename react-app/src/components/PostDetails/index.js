import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getSubredditRequest } from "../../store/subreddits";
import PostCard from "../PostCard";
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
  let subredditId;
  // subredditId = Number(subredditId);
  const dispatch = useDispatch();
  const history = useHistory();
  const subredditInfo = useSelector((state) => Object.values(state.subreddits));
  const post = useSelector((state) => Object.values(state.posts));

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
                return <PostCard post={post} />;
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
                  <div className="subredditInformation">
                    <div className="aboutSubreddit">
                      <span>About Community</span>
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
