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

import "./Subreddit.css";

const SubredditPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  let { subredditId } = useParams();
  subredditId = Number(subredditId);
  const subredditInfo = useSelector((state) => Object.values(state.subreddits));
  const posts = useSelector((state) => Object.values(state.posts));
  const sessionUser = useSelector((state) => state.session.user);

  const [subredditLoaded, setSubredditLoaded] = useState(false);
  const [postsLoaded, setPostsLoaded] = useState(false);
  const [userOwnsSubreddit, setUserOwnsSubreddit] = useState(false);
  const [userJoinedSubreddit, setUserJoinedSubreddit] = useState(false);

  useEffect(() => {
    dispatch(getSubredditRequest(subredditId)).then(() => {
      setSubredditLoaded(true);
    });
    dispatch(getAllSubredditsPostsRequest(subredditId)).then(() => {
      setPostsLoaded(true);
    });
  }, [dispatch]);

  useEffect(() => {
    if (subredditLoaded && subredditInfo[0]) {
      subredditInfo[0].subscriptions.forEach((subscription) => {
        if (subscription.user_id === sessionUser.id) {
          setUserJoinedSubreddit(true);
        }
      });
      setUserOwnsSubreddit(sessionUser.id === subredditInfo[0].owner_id);
    }
  }, [subredditInfo]);

  const createPostPage = () => {
    let path = `/submit?subreddit_id=${subredditId}`;
    history.push(path);
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
    dispatch(subscribeToSubredditRequest(subredditId));
    setUserJoinedSubreddit(!userJoinedSubreddit);
  };

  return (
    <div className="pageContainer">
      {subredditLoaded &&
        subredditInfo.map((subreddit) => {
          return (
            <div className="subredditBanner">
              <img src={subreddit.banner_img}></img>
              <div className="subredditTitle">
                <div className="innerSubredditTitleDiv">
                  <div className="titleDivContent">
                    <div className="iconBackground"></div>
                    <img
                      className="subredditIcon"
                      src={subreddit.icon_url}
                    ></img>
                    <div className="subredditNameDiv">
                      <div className="bigSubredditName">
                        {subreddit.name}
                        {/* <div className="joinToggleSubreddit"> */}
                        {userOwnsSubreddit ? (
                          <>
                            <button
                              onClick={() => editSubredditPage(subreddit.id)}
                            >
                              Edit subreddit
                            </button>
                            <button
                              onClick={() => deleteSubreddit(subreddit.id)}
                            >
                              Delete subreddit
                            </button>
                          </>
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
          {postsLoaded ? (
            posts.length ? (
              posts.map((post) => {
                return <PostCard post={post} />;
              })
            ) : (
              <div>No posts yet</div>
            )
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <div className="rowTwoSubreddit">
          {subredditLoaded &&
            subredditInfo.map((subreddit) => {
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
    </div>
  );
};

export default SubredditPage;
