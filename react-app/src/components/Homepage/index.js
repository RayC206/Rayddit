import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { getAllSubredditsRequest } from "../../store/subreddits";
import createIcon from "./createIcon.png";
import linkedin from "./linkedin.png";
import github from "./github.png";

import "./Homepage.css";
import PostCard from "../PostCard";
import LoginFormModal from "../LoginFormModal";

import { getAllPostsRequest } from "../../store/posts";

const Homepage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const sessionUser = useSelector((state) => state.session.user);
  const subredditInfo = useSelector((state) => Object.values(state.subreddits));
  const posts = useSelector((state) => {
    let posts = Object.values(state.posts);
    posts = posts.sort((postA, postB) =>
      new Date(postA.created_at) < new Date(postB.created_at) ? 1 : -1
    );
    return posts;
  });

  const [loginFormModalIsOpen, setIsLoginFormModalIsOpen] = useState(false);
  const [postsLoaded, setPostsLoaded] = useState(false);
  const [subredditLoaded, setSubredditLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  useEffect(() => {
    dispatch(getAllSubredditsRequest()).then(() => {
      setSubredditLoaded(true);
    });
    dispatch(getAllPostsRequest()).then(() => {
      setPostsLoaded(true);
    });
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY <
      document.body.offsetHeight - 100
    ) {
      return;
    }

    setTimeout(() => {
      setCurrentPage((prevPage) => prevPage + 1);
    }, 500);
  };

  const createPostPage = () => {
    if (!sessionUser) {
      setIsLoginFormModalIsOpen(true);
    } else {
      let path = `/submit`;
      history.push(path);
    }
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
      <createPostPage />
      <LoginFormModal
        isOpen={loginFormModalIsOpen}
        modalToggle={setIsLoginFormModalIsOpen}
      />
      <div className="homePageDiv">
        <div className="rowOne">
          <div className="createPostDiv">
            <div className="createIcon">
              <img src={createIcon} alt="createIcon"></img>
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
              <>
                {posts.slice(0, currentPage * postsPerPage).map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    modalToggle={setIsLoginFormModalIsOpen}
                  />
                ))}
                {posts.length > currentPage * postsPerPage && (
                  <div>Loading...</div>
                )}
              </>
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
                    <div key={subreddit.id}>
                      <div
                        className="homepageSubredditDescriptionDiv"
                        onClick={(e) => subredditsPage(subreddit.id)}
                      >
                        <div className="homepageSubredditDescription">
                          <div className="homeSubredditIcon">
                            <img
                              src={subreddit.icon_url}
                              alt="subredditIcon"
                              onError={(e) => {
                                e.currentTarget.src =
                                  "https://i.imgur.com/hkMSod3.png";
                              }}
                            ></img>
                          </div>
                          <div className="homeSubredditName">
                            {subreddit.name}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="subredditCreateDiv">
              <div
                className="createSubredditButton"
                onClick={createSubredditPage}
              >
                {" "}
                Create a Subreddit
              </div>
            </div>
          </div>
          <div className="developerInfoDiv">
            <div className="developerInfoContent">
              <span>Developer's Links:</span>
            </div>
            <div className="devLinkIcons">
              <a
                className="iconContainer"
                href="https://github.com/RayC206/Rayddit"
              >
                <div className="githubIcon">
                  <img src={github} alt="gitHubLogo"></img>
                  <span>Github</span>
                </div>
              </a>
              <a
                className="iconContainer"
                href="https://www.linkedin.com/in/ray-charles-henry/"
              >
                <div className="linkedInIcon">
                  <img src={linkedin} alt="linkedInLogo"></img>
                  <span>LinkedIn</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
