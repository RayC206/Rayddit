import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "./ProfilePage.css";
import PostCard from "../PostCard";

import { deletePostRequest, getUserPostsRequest } from "../../store/posts";
import { getAllUsersSubredditsRequest } from "../../store/subreddits";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let { userId } = useParams();
  userId = Number(userId);
  const sessionUser = useSelector((state) => state.session.user);
  const posts = useSelector((state) => Object.values(state.posts));
  const subreddits = useSelector((state) => Object.values(state.subreddits));

  const [postsLoaded, setPostsLoaded] = useState(false);
  const [userOwnsProfile, setUserOwnsProfile] = useState(false);
  const [loginFormModalIsOpen, setIsLoginFormModalIsOpen] = useState(false);
  const [user, setUser] = useState([]);
  const [userSubredditsLoaded, setUserSubredditsLoaded] = useState(false);
  console.log(subreddits);

  useEffect(() => {
    dispatch(getUserPostsRequest(userId)).then(() => {
      setPostsLoaded(true);
    });
    dispatch(getAllUsersSubredditsRequest()).then(() => {
      setUserSubredditsLoaded(true);
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

  const createPostPage = () => {
    if (!sessionUser) {
      setIsLoginFormModalIsOpen(true);
    } else {
      let path = `/submit`;
      history.push(path);
    }
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
                      <div className="editDeletePostButtonDiv">
                        <button
                          className="editPostButton"
                          onClick={() => {
                            editPost(post.id);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="deletePostButton"
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
              <div className="innerProfileInfoDiv">
                <div className="profileCreatePostDiv">
                  <a className="createSubredditPost" onClick={createPostPage}>
                    {" "}
                    create post
                  </a>
                </div>
                <div className="profileInfodDiv">
                  <img src={user.profile_image}></img>
                  <span>u/{user.username}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
