import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "./ProfilePage.css";

import {
  deletePostRequest,
  downvotePostRequest,
  getUserPostsRequest,
  upvotePostRequest,
} from "../../store/posts";

const ProfilePage = () => {
  const POST_TYPE_TEXT = 1;
  const POST_TYPE_IMAGE = 2;
  const POST_TYPE_LINK = 3;

  const dispatch = useDispatch();
  const history = useHistory();
  let { userId } = useParams();
  userId = Number(userId);
  const sessionUser = useSelector((state) => state.session.user);
  const posts = useSelector((state) => Object.values(state.posts));

  const [postsLoaded, setPostsLoaded] = useState(false);
  const [userOwnsProfile, setUserOwnsProfile] = useState(false);
  console.log(userOwnsProfile);

  useEffect(() => {
    dispatch(getUserPostsRequest(userId)).then(() => {
      setPostsLoaded(true);
    });
  }, [dispatch, userId]);

  useEffect(() => {
    setUserOwnsProfile(sessionUser.id === userId);
  }, [sessionUser, userId]);

  const upvotePost = (postId) => {
    dispatch(upvotePostRequest(postId));
  };

  const downvotePost = (postId) => {
    dispatch(downvotePostRequest(postId));
  };

  const editPost = (postId) => {
    let path = `/posts/${postId}/edit`;
    history.push(path);
  };

  const deletePost = (postId) => {
    dispatch(deletePostRequest(postId));
  };

  const createPostPage = () => {
    let path = `/submit`;
    history.push(path);
  };

  const postDetailPage = (postId) => {
    let path = `/posts/${postId}`;
    history.push(path);
  };

  return (
    <>
      {postsLoaded ? (
        posts.length ? (
          posts.map((post) => {
            return (
              <div className="outerPostContainer" key={post.id}>
                <div className="voteDiv">
                  <button onClick={() => upvotePost(post.id)}>Up</button>
                  {post.total_votes}
                  <button onClick={() => downvotePost(post.id)}>Down</button>
                </div>
                <div
                  className="postContainer"
                  onClick={(e) => postDetailPage(post.id)}
                >
                  <div className="postTopDescription">
                    <div className="postSubredditName">
                      r/{post.subreddit_name}
                    </div>
                    <div className="postUsername">u/{post.username}</div>
                    <div className="postTimeago">{post.created_at_timeago}</div>
                  </div>
                  <div className="postTitle">{post.title}</div>
                  <div className="postContent">
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
                {userOwnsProfile && (
                  <div>
                    <button
                      onClick={() => {
                        editPost(post.id);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        deletePost(post.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div>User hasnt posted anything yet.</div>
        )
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default ProfilePage;
