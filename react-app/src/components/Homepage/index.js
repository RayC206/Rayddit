import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Redirect } from "react-router-dom";
import { getAllSubredditsRequest } from "../../store/subreddits";
import createIcon from "./createIcon.png";

import "./Homepage.css";
import PostCard from "../PostCard";
import LoginFormModal from "../LoginFormModal";

import { getAllPostsRequest } from "../../store/posts";

const Homepage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const subredditInfo = useSelector((state) => Object.values(state.subreddits));
  const posts = useSelector((state) => Object.values(state.posts));
  console.log("HERE___");
  console.log(subredditInfo);
  console.log("POSTS");
  console.log(posts);

  const [loginFormModalIsOpen, setIsLoginFormModalIsOpen] = useState(false);
  const [postsLoaded, setPostsLoaded] = useState(false);
  const [subredditLoaded, setSubredditLoaded] = useState(false);

  useEffect(() => {
    dispatch(getAllSubredditsRequest()).then(() => {
      setSubredditLoaded(true);
    });
    dispatch(getAllPostsRequest()).then(() => {
      setPostsLoaded(true);
    });
  }, [dispatch]);

  const createPostPage = () => {
    let path = `/submit`;
    history.push(path);
  };

  const createSubredditPage = () => {
    if (!sessionUser) {
      setIsLoginFormModalIsOpen(true);
    } else {
      let path = `/create-subreddit`;
      history.push(path);
    }
  };

  const subredditsPage = (subredditId) => {
    let path = `/r/${subredditId}`;
    history.push(path);
  };

  return (
    <div className="pageContainer">
      <LoginFormModal
        isOpen={loginFormModalIsOpen}
        modalToggle={setIsLoginFormModalIsOpen}
      />
      <div className="homePageDiv">
        <div className="rowOne">
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
                console.log("herreeee")
                console.log(post)
                return (
                  <PostCard
                    post={post}
                    modalToggle={setIsLoginFormModalIsOpen}
                  />
                );
              })
            ) : (
              <div>No posts yet</div>
            )
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <div className="rowTwo">
          <div className="homePageSubredditInfo">
            <div className="aboutSubreddit">
              <span>Recommended Communities</span>
            </div>
            <div className="homepageSubredditContent">
              {subredditLoaded &&
                subredditInfo.map((subreddit) => {
                  return (
                    <>
                      <div
                        className="homepageSubredditDescriptionDiv"
                        onClick={(e) => subredditsPage(subreddit.id)}
                      >
                        <div className="homepageSubredditDescription">
                          <div className="homeSubredditIcon">
                            <img src={subreddit.icon_url}></img>
                          </div>
                          <div className="homeSubredditName">
                            {subreddit.name}
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
            </div>
            <div className="subredditCreateDiv">
              <a
                className="createSubredditButton"
                onClick={createSubredditPage}
              >
                {" "}
                Create a Subreddit
              </a>
            </div>
          </div>
          {/* <div className="createSubreddit"></div> */}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
