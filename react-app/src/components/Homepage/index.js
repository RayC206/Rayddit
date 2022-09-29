import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllPostsRequest } from "../../store/posts";

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

  return (
    <>
      {postsLoaded ? (
        posts.length ? (
          posts.map((post) => {
            return (
              <div>
                <div>r/{post.subreddit_name}</div>
                <div>u/{post.username}</div>
                <div>{post.created_at_timeago}</div>
                <div>{post.title}</div>
                {() => {
                  if (post.post_type_id === POST_TYPE_TEXT) {
                    return <div>{post.text}</div>;
                  } else if (post.post_type_id === POST_TYPE_IMAGE) {
                    return <img src={post.img_url} />;
                  } else if (post.post_type_id === POST_TYPE_LINK) {
                    return <a href={post.link_url}>{post.link_url}</a>;
                  }
                }}
                ---
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
