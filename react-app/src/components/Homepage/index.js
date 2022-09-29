import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const sessionUser = useSelector((state) => state.session.user);
  const posts = useSelector((state) => Object.values(state.posts));
  console.log(posts);

  const [postsLoaded, setPostsLoaded] = useState(false);

  useEffect(() => {
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

  return (
    <>
      {postsLoaded ? (
        posts.length ? (
          posts.map((post) => {
            return (
              <div className="outerPostContainer">
                <div className="voteDiv">
                  <button onClick={() => upvotePost(post.id)}>Up</button>
                  {post.total_votes}
                  <button onClick={() => downvotePost(post.id)}>Down</button>
                </div>
                <div className="postContainer">
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
              </div>
            );
          })
        ) : (
          <div>No posts yet</div>
        )
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Homepage;
