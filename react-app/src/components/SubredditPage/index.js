import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getSubredditRequest, getAllSubredditsPostsRequest } from "../../store/subreddits";

import {
  downvotePostRequest,
  upvotePostRequest,
} from "../../store/posts";

const SubredditPage = () => {
  const POST_TYPE_TEXT = 1;
  const POST_TYPE_IMAGE = 2;
  const POST_TYPE_LINK = 3;

  const dispatch = useDispatch();
  const history = useHistory();
  let { subredditId } = useParams();
  subredditId = Number(subredditId);
  const subredditInfo = useSelector((state) => Object.values(state.subreddits));
  const posts = useSelector((state)=> Object.values(state.posts))
  const [postsLoaded, setPostsLoaded] = useState(false);
  console.log("SUBREDDIT")
  console.log(subredditInfo)
  console.log("POSTS")
  console.log(posts)

  useEffect(() => {
    dispatch(getSubredditRequest(subredditId))
    dispatch(getAllSubredditsPostsRequest(subredditId))

    .then(() => {
      setPostsLoaded(true);
    });
  }, [dispatch, subredditId]);

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

  return  (
    <div>test</div>
  )
}

export default SubredditPage;
