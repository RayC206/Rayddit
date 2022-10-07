import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import {
  getSubredditRequest,
  subscribeToSubredditRequest,
  deleteSubredditRequest,
} from "../../store/subreddits";
import { getAllSubredditsPostsRequest } from "../../store/posts";
import createIcon from "../Homepage/createIcon.png";
import PostCard from "../PostCard";
import LoginFormModal from "../LoginFormModal";
import EditSubredditModal from "../EditSubreddit/EditSubredditModal";

import "./Subreddit.css";
import ErrorPage from "../ErrorPage";

const SubredditPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  let { subredditId } = useParams();
  subredditId = Number(subredditId);
  const subredditInfo = useSelector((state) => Object.values(state.subreddits));
  const posts = useSelector((state) => {
    let posts = Object.values(state.posts);
    posts = posts.sort((postA, postB) =>
      new Date(postA.created_at) < new Date(postB.created_at) ? 1 : -1
    );

    return posts;
  });
  const sessionUser = useSelector((state) => state.session.user);

  const [loginFormModalIsOpen, setIsLoginFormModalIsOpen] = useState(false);
  const [editSubredditFormModalIsOpen, setIsEditSubredditFormModalIsOpen] =
    useState(false);
  const [subredditLoaded, setSubredditLoaded] = useState(false);
  const [postsLoaded, setPostsLoaded] = useState(false);
  const [userOwnsSubreddit, setUserOwnsSubreddit] = useState(false);
  const [userJoinedSubreddit, setUserJoinedSubreddit] = useState(false);
  console.log("SUBREDDITINFO");
  console.log(subredditInfo);

  useEffect(() => {
    dispatch(getSubredditRequest(subredditId)).then(() => {
      setSubredditLoaded(true);
    });
    dispatch(getAllSubredditsPostsRequest(subredditId)).then(() => {
      setPostsLoaded(true);
    });
  }, [dispatch]);

  useEffect(() => {
    console.log("---");
    if (sessionUser && subredditLoaded && subredditInfo[0]) {
      subredditInfo[0].subscriptions.forEach((subscription) => {
        if (subscription.user_id === sessionUser.id) {
          setUserJoinedSubreddit(true);
        }
      });
      setUserOwnsSubreddit(sessionUser.id === subredditInfo[0].owner_id);
    }
  }, [subredditLoaded]);

  const createPostPage = () => {
    if (!sessionUser) {
      setIsLoginFormModalIsOpen(true);
    } else {
      let path = `/submit?subreddit_id=${subredditId}`;
      history.push(path);
    }
  };

  const editSubredditPage = (subredditId) => {
    let path = `/r/${subredditId}/edit`;
    history.push(path);
  };

  const deleteSubreddit = async (subredditId) => {
    await dispatch(deleteSubredditRequest(subredditId)).then(() => {
      history.push(`/`);
    });
  };

  const joinSubreddit = () => {
    if (!sessionUser) {
      setIsLoginFormModalIsOpen(true);
    } else {
      dispatch(subscribeToSubredditRequest(subredditId));
      setUserJoinedSubreddit((userJoinedSubreddit) => !userJoinedSubreddit);
    }
  };

  return (
    <div className="pageContainer">
      <LoginFormModal
        isOpen={loginFormModalIsOpen}
        modalToggle={setIsLoginFormModalIsOpen}
      />
      {subredditLoaded ? (
        <>
          {subredditInfo[0] ? (
            <>
              {subredditInfo.map((subreddit) => {
                return (
                  <div className="subredditBanner">
                    <img
                      src={subreddit?.banner_img}
                      onError={(e) => {
                        e.currentTarget.src = "https://i.imgur.com/aQxmKOg.png";
                      }}
                    ></img>
                    <div className="subredditTitle">
                      <div className="innerSubredditTitleDiv">
                        <div className="titleDivContent">
                          <div className="iconBackground"></div>
                          <img
                            className="subredditIcon"
                            src={subreddit?.icon_url}
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://i.imgur.com/hkMSod3.png";
                            }}
                          ></img>
                          <div className="subredditNameDiv">
                            <div className="bigSubredditName">
                              {subreddit.name}
                              {/* <div className="joinToggleSubreddit"> */}
                              {userOwnsSubreddit ? (
                                <div className="subredditButtonDiv">
                                  <button
                                    className="editSubredditButton"
                                    onClick={() =>
                                      setIsEditSubredditFormModalIsOpen(true)
                                    }
                                  >
                                    Edit
                                  </button>
                                  <EditSubredditModal
                                    isOpen={editSubredditFormModalIsOpen}
                                    modalToggle={
                                      setIsEditSubredditFormModalIsOpen
                                    }
                                  />
                                  <button
                                    className="deleteSubredditButton"
                                    onClick={() =>
                                      deleteSubreddit(subreddit.id)
                                    }
                                  >
                                    Delete
                                  </button>
                                </div>
                              ) : userJoinedSubreddit ? (
                                <button
                                  className="joinToggleSubredditButton"
                                  onClick={() => joinSubreddit()}
                                >
                                  Joined
                                </button>
                              ) : (
                                <button
                                  className="joinToggleSubredditButton"
                                  onClick={() => joinSubreddit()}
                                >
                                  Join
                                </button>
                              )}

                              {/* </div> */}
                            </div>
                            <div className="littleSubredditName">
                              r/{subreddit.name}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="homePageDiv">
                <div className="rowOneSubreddit">
                  <div className="createPostDiv">
                    <div className="createIcon">
                      <img src={createIcon}></img>
                    </div>
                    <div className="createInputContainer">
                      <input
                        type="text"
                        placeholder="Create Post"
                        className="inputBox"
                        onClick={createPostPage}
                      />
                    </div>
                  </div>
                  {postsLoaded &&
                    (posts.length ? (
                      posts.map((post) => {
                        return (
                          <PostCard
                            post={post}
                            modalToggle={setIsLoginFormModalIsOpen}
                          />
                        );
                      })
                    ) : (
                      <div>No posts yet</div>
                    ))}
                </div>
                <div className="rowTwoSubreddit">
                  {subredditInfo.map((subreddit) => {
                    return (
                      <>
                        <div className="subredditInformation">
                          <div className="aboutSubreddit">
                            <span>About Community</span>
                          </div>
                          <div className="subredditDescriptionDiv">
                            <div className="subredditDescription">
                              {subreddit.description}
                            </div>
                            {/* <div className="subredditBornDate">{subreddit.created_at}</div> */}
                          </div>
                          <div className="subredditCreatePostDiv">
                            <a
                              className="createSubredditPost"
                              onClick={createPostPage}
                            >
                              {" "}
                              create post
                            </a>
                          </div>
                        </div>
                        {/* <div className="createSubreddit"></div> */}
                      </>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <div>
              <ErrorPage />
              <h1>Subreddit does not exist</h1>
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

export default SubredditPage;
