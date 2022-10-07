import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "./ProfilePage.css";
import PostCard from "../PostCard";

import { deletePostRequest, getUserPostsRequest } from "../../store/posts";
import { getAllUsersSubredditsRequest } from "../../store/subreddits";
import ErrorPage from "../ErrorPage";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let { userId } = useParams();
  userId = Number(userId);
  const sessionUser = useSelector((state) => state.session.user);
  const posts = useSelector((state) => {
    let posts = Object.values(state.posts);
    posts = posts.sort((postA, postB) =>
      new Date(postA.created_at) < new Date(postB.created_at) ? 1 : -1
    );

    return posts;
  });
  const subreddits = useSelector((state) => Object.values(state.subreddits));

  const [postsLoaded, setPostsLoaded] = useState(false);
  const [userOwnsProfile, setUserOwnsProfile] = useState(false);
  const [loginFormModalIsOpen, setIsLoginFormModalIsOpen] = useState(false);
  const [user, setUser] = useState([]);
  const [userSubredditsLoaded, setUserSubredditsLoaded] = useState(false);

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
    }
    fetchData();
  }, [userId]);

  useEffect(() => {
    setUserOwnsProfile(sessionUser.id === userId);
  }, [sessionUser, userId]);

  const formatCakeDay = (date) => {
    if (date) {
      return new Intl.DateTimeFormat("en", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(date));
    }
  };

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

  const subredditsPage = (subredditId) => {
    let path = `/r/${subredditId}`;
    history.push(path);
  };

  return (
    <div className="pageContainer">
      {postsLoaded ? (
        <>
          {posts.length || user ? (
            <div className="homePageDiv">
              <div className="rowOne">
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
                          <PostCard
                            post={post}
                            modalToggle={setIsLoginFormModalIsOpen}
                          />
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
                {user ? (
                  <div className="userProfileInfo">
                    <div className="userProfileBanner"></div>
                    <div className="innerProfileInfoDiv">
                      {userOwnsProfile && (
                        <div className="profileCreatePostDiv">
                          <a
                            className="createSubredditPost"
                            onClick={createPostPage}
                          >
                            {" "}
                            create post
                          </a>
                        </div>
                      )}
                      <div className="profileInfodDiv">
                        {user.profile_image ? (
                          <img
                            src={user.profile_image}
                            alt="users pic"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://i.imgur.com/n1eSrjP.jpg";
                            }}
                          ></img>
                        ) : (
                          <img
                            src="https://i.imgur.com/n1eSrjP.jpg"
                            alt="Error Pic"
                          ></img>
                        )}
                        <span>
                          {" "}
                          {user.username ? (
                            <span>r/{user.username}</span>
                          ) : (
                            <span>User not found!</span>
                          )}{" "}
                        </span>
                      </div>
                      <div className="cakeDay">
                        <div>
                          {user.created_at && (
                            <span className="cakeDaySpan">Cake Day:</span>
                          )}
                          <div>
                            <span className="cakeDayDate">
                              {formatCakeDay(user.created_at)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <ErrorPage />
                    <h1>User Profile Does not exist</h1>
                  </div>
                )}
                {userOwnsProfile && (
                  <div className="followedSubredditInfo">
                    <div className="aboutFollowedSubreddit">
                      <span>Followed Subreddits</span>
                    </div>
                    <div className="followedSubredditContent">
                      {userSubredditsLoaded &&
                        subreddits.map((subreddit) => {
                          return (
                            <>
                              <div
                                className="followedSubredditDescriptionDiv"
                                onClick={(e) => subredditsPage(subreddit.id)}
                              >
                                <div className="followedSubredditDescription">
                                  <div className="homeSubredditIcon">
                                    <img
                                      src={subreddit.icon_url}
                                      onError={(e) => {
                                        e.currentTarget.src =
                                          "https://i.imgur.com/hkMSod3.png";
                                      }}
                                    ></img>
                                  </div>
                                  <div className="followedubredditName">
                                    {subreddit.name}
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <ErrorPage />
              <h1>User Profile Does not exist</h1>
            </div>
          )}
        </>
      ) : (
        <div className="loadingState">
          <div>
            <span>Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
