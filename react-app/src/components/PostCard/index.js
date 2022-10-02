import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./PostCard.css";

import { downvotePostRequest, upvotePostRequest } from "../../store/posts";

import {
  TiArrowUpOutline,
  TiArrowUpThick,
  TiArrowDownOutline,
  TiArrowDownThick,
} from "react-icons/ti";

const PostCard = ({ post }) => {
  const POST_TYPE_TEXT = 1;
  const POST_TYPE_IMAGE = 2;
  const POST_TYPE_LINK = 3;

  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  const [isUpvotedByUser, setIsUpvotedByUser] = useState(false);
  const [isDownvotedByUser, setIsDownvotedByUser] = useState(false);

  useEffect(() => {
    post.votes.forEach((vote) => {
      if (sessionUser.id === vote.user_id) {
        if (vote.value === 1) {
          setIsUpvotedByUser(true);
        } else if (vote.value === -1) {
          setIsDownvotedByUser(true);
        }
        return;
      }
    });
  }, [post]);

  const upvotePost = (postId) => {
    dispatch(upvotePostRequest(postId));
    setIsUpvotedByUser(!isUpvotedByUser);
    setIsDownvotedByUser(false);
  };

  const downvotePost = (postId) => {
    dispatch(downvotePostRequest(postId));
    setIsDownvotedByUser(!isDownvotedByUser);
    setIsUpvotedByUser(false);
  };

  const postDetailPage = (postId) => {
    let path = `/posts/${postId}`;
    history.push(path);
  };

  const subredditPage = (subredditId) => {
    let path = `/r/${subredditId}`;
    history.push(path);
  };

  const usersProfilePage = (userId) => {
    let path = `/user/${userId}`;
    history.push(path);
  };

  return (
    <div className="outerPostContainer" key={post.id}>
      <div className="voteDiv">
        {isUpvotedByUser ? (
          <TiArrowUpThick
            className="thickUpvote"
            onClick={() => upvotePost(post.id)}
          />
        ) : (
          <TiArrowUpThick
            className="thickUpvoteNormal"
            onClick={() => upvotePost(post.id)}
          ></TiArrowUpThick>
        )}
        {isUpvotedByUser ? (
          <span className="upvotedTotalCount">{post.total_votes}</span>
        ) : isDownvotedByUser ? (
          <span className="downvotedTotalCount">{post.total_votes}</span>
        ) : (
          <span className="unvotedTotalCount">{post.total_votes}</span>
        )}

        {isDownvotedByUser ? (
          <TiArrowDownThick
            className="thickDownvote"
            onClick={() => downvotePost(post.id)}
          />
        ) : (
          <TiArrowDownThick
            className="thickDownvoteNormal"
            onClick={() => downvotePost(post.id)}
          ></TiArrowDownThick>
        )}
      </div>
      <div className="postContainer">
        <div className="postTopDescription">
          <div
            className="postSubredditName"
            onClick={(e) => subredditPage(post.subreddit_id)}
          >
            r/{post.subreddit_name}
          </div>
          <div
            className="postUsername"
            onClick={(e) => usersProfilePage(post.user_id)}
          >
            u/{post.username}
          </div>
          <div className="postTimeago">{post.created_at_timeago}</div>
        </div>
        <div className="postTitle">{post.title}</div>
        <div className="postContent" onClick={(e) => postDetailPage(post.id)}>
          {(() => {
            if (post.post_type_id === POST_TYPE_TEXT) {
              return <div className="postText">{post.text}</div>;
            } else if (post.post_type_id === POST_TYPE_IMAGE) {
              return <img className="postImage" src={post.img_url} />;
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
};

export default PostCard;
