import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import "./PostDetails.css";

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
  const dispatch = useDispatch();
  const history = useHistory();
  const post = useSelector((state) => Object.values(state.posts));
  console.log("POST");
  console.log(post[0]);

  const [postLoaded, setPostsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getPostRequest(postId)).then(() => {
      setPostsLoaded(true);
    });
  }, [dispatch]);

  const upvotePost = (postId) => {
    dispatch(upvotePostRequest(postId));
  };

  const downvotePost = (postId) => {
    dispatch(downvotePostRequest(postId));
  };

  return (
    <div>
      {postLoaded ? (
        post.length ? (
          post.map((post) => {
            return (
              <div className="outerPostDetailContainer" key={post.id}>
                <div className="voteDiv">
                  <button onClick={() => upvotePost(post.id)}>Up</button>
                  {post.total_votes}
                  <button onClick={() => downvotePost(post.id)}>Down</button>
                </div>
                <div className="postDetailContainer">
                  <div className="postDetailTopDescription">
                    <div className="postDetailSubredditName">
                      r/{post.subreddit_name}
                    </div>
                    <div className="postDetailUsername">u/{post.username}</div>
                    <div className="postDetailTimeago">
                      {post.created_at_timeago}
                    </div>
                  </div>
                  <div className="postDetailTitle">{post.title}</div>
                </div>
                <div className="postDetailContent">
                  {(() => {
                    if (post.post_type_id === POST_TYPE_TEXT) {
                      return <div className="postDetailText">{post.text}</div>;
                    } else if (post.post_type_id === POST_TYPE_IMAGE) {
                      return <img className="postDetailImage" src={post.img_url} />;
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
            );
          })
        ) : (
          <div>Post does not exist</div>
        )
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default PostDetails;
