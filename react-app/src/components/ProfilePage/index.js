import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "./ProfilePage.css";
import PostCard from "../PostCard";

import { deletePostRequest, getUserPostsRequest } from "../../store/posts";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let { userId } = useParams();
  userId = Number(userId);
  const sessionUser = useSelector((state) => state.session.user);
  const posts = useSelector((state) => Object.values(state.posts));

  const [postsLoaded, setPostsLoaded] = useState(false);
  const [userOwnsProfile, setUserOwnsProfile] = useState(false);
  const [user, setUser] = useState([]);

  useEffect(() => {
    dispatch(getUserPostsRequest(userId)).then(() => {
      setPostsLoaded(true);
    });
  }, [dispatch, userId]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/users/${userId}`);
      const responseData = await response.json();
      console.log("USER");
      setUser(responseData);
      console.log(user);
    }
    fetchData();
  }, [userId]);

  useEffect(() => {
    setUserOwnsProfile(sessionUser.id === userId);
  }, [sessionUser, userId]);

  const editPost = (postId) => {
    let path = `/posts/${postId}/edit`;
    history.push(path);
  };

  const deletePost = (postId) => {
    dispatch(deletePostRequest(postId));
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
          {postsLoaded ? (
            posts.length ? (
              posts.map((post) => {
                return (
                  <>
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
                    <PostCard post={post} />
                  </>
                );
              })
            ) : (
              <div className="noPostsYetDiv">
                <span>No posts yet</span>
              </div>
            )
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <div className="rowTwo">
          {user && (
            <div className="userProfileInfo">
              <div className="userProfileBanner"></div>
              <div className="profileInfodDiv">
                <img src={user.profile_image}></img>
                <span>u/{user.username}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
