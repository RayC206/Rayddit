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
  let { postId } = useParams();
  postId = Number(postId);
  const dispatch = useDispatch();
  const history = useHistory();
  const post = useSelector((state) => Object.values(state.posts));
  console.log("POST")
  console.log(post)

  const [postLoaded, setPostsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getPostRequest(postId)).then(() => {
      setPostsLoaded(true);
    });
  }, [dispatch]);



  return (
    <>
    {postLoaded ? (post.length ? (<div></div>) : (<div>Post does not exist</div>)) : (<div>Loading...</div>)}
      </>
   )
  // if (postLoaded) {
  //   if (post.length) {
  //     return (
  //       <div>test</div>
  //     )
  //   } else {
  //     return (
  //       <div>Post does not exist</div>
  //     )
  //   }
  // } else {
  //   return (
  //     <div>Loading...</div>
  //   )
  // }
};

export default PostDetails;
