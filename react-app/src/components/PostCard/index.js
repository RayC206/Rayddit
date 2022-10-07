import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import "./PostCard.css";
import imgUrlBackup from "./brokenImageUpload.png";

import { downvotePostRequest, upvotePostRequest } from "../../store/posts";

import {
  TiArrowUpOutline,
  TiArrowUpThick,
  TiArrowDownOutline,
  TiArrowDownThick,
} from "react-icons/ti";

const PostCard = ({ post, modalToggle }) => {
  console.log(modalToggle);
  const POST_TYPE_TEXT = 1;
  const POST_TYPE_IMAGE = 2;
  const POST_TYPE_LINK = 3;

  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  const [isUpvotedByUser, setIsUpvotedByUser] = useState(false);
  const [isDownvotedByUser, setIsDownvotedByUser] = useState(false);

  post.created_at = new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(post.created_at));

  useEffect(() => {
    setIsUpvotedByUser(false);
    post.votes.forEach((vote) => {
      if (sessionUser && sessionUser.id === vote.user_id) {
        if (vote.value === 1) {
          setIsUpvotedByUser(true);
        } else if (vote.value === -1) {
          setIsDownvotedByUser(true);
        }
        return;
      }
    });
  }, [post, sessionUser]);

  const upvotePost = (postId) => {
    if (!sessionUser) {
      modalToggle(true);
    } else {
      dispatch(upvotePostRequest(postId));
      setIsUpvotedByUser(!isUpvotedByUser);
      setIsDownvotedByUser(false);
    }
  };

  const downvotePost = (postId) => {
    if (!sessionUser) {
      modalToggle(true);
    } else {
      dispatch(downvotePostRequest(postId));
      setIsDownvotedByUser(!isDownvotedByUser);
      setIsUpvotedByUser(false);
    }
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
          <div className="postTimeago">{post.created_at}</div>
        </div>
        <div className="postTitle" onClick={(e) => postDetailPage(post.id)}>
          <span
            className="postTitleSpan"
            onClick={(e) => postDetailPage(post.id)}
          >
            {post.title}
          </span>
        </div>
        <div className="postContent" onClick={(e) => postDetailPage(post.id)}>
          {(() => {
            if (post.post_type_id === POST_TYPE_TEXT) {
              return <div className="postText">{post.text}</div>;
            } else if (post.post_type_id === POST_TYPE_IMAGE) {
              return (
                <img
                  className="postImage"
                  src={post.img_url}
                  onError={(e) => {
                    e.currentTarget.src = imgUrlBackup;
                  }}
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
};

export default PostCard;
