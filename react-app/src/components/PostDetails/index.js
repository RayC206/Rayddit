import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getSubredditRequest } from "../../store/subreddits";
import PostCard from "../PostCard";
import LoginFormModal from "../LoginFormModal";
import "./PostDetails.css";
import EditComment from "../EditComment";

import { AiFillCaretRight } from "react-icons/ai";

import { getPostRequest, deletePostRequest } from "../../store/posts";
import {
  getAllPostCommentsRequest,
  deleteCommentRequest,
} from "../../store/comments";
import CreateComment from "../CreateComment";

// import ErrorPage from "../ErrorPage";

const PostDetails = () => {
  // const POST_TYPE_TEXT = 1;
  // const POST_TYPE_IMAGE = 2;
  // const POST_TYPE_LINK = 3;

  let { postId } = useParams();
  postId = Number(postId);
  let subredditId;
  // subredditId = Number(subredditId);
  const dispatch = useDispatch();
  const history = useHistory();
  const subredditInfo = useSelector((state) => Object.values(state.subreddits));
  const post = useSelector((state) => Object.values(state.posts));
  const sessionUser = useSelector((state) => state.session.user);
  const comments = useSelector((state) => Object.values(state.comments));
  const [loginFormModalIsOpen, setIsLoginFormModalIsOpen] = useState(false);
  const [openCommentEditFormId, setOpenCommentEditFormId] = useState(false);
  const [openCommentReplyFormId, setOpenCommentReplyFormId] = useState(false);
  // console.log("COMMENTS");
  // console.log(comments);

  if (post && post.length) {
    subredditId = post[0].subreddit_id;
  }

  const [subredditLoaded, setSubredditLoaded] = useState(false);
  const [postLoaded, setPostLoaded] = useState(false);
  const [commentsLoaded, setCommentsLoaded] = useState(false);

  useEffect(() => {
    if (isNaN(postId)) {
      setPostLoaded(true);
    } else {
      dispatch(getPostRequest(postId)).then(() => {
        setPostLoaded(true);
        subredditId &&
          dispatch(getSubredditRequest(subredditId)).then(() => {
            setSubredditLoaded(true);
          });
        dispatch(getAllPostCommentsRequest(postId)).then(() => {
          setCommentsLoaded(true);
        });
      });
    }
  }, [dispatch, subredditId, postId]);

  const subredditPage = (subredditId) => {
    let path = `/r/${subredditId}`;
    history.push(path);
  };

  const createPostPage = () => {
    if (!sessionUser) {
      setIsLoginFormModalIsOpen(true);
    } else {
      let path = `/submit?subreddit_id=${subredditId}`;
      history.push(path);
    }
  };

  const editPost = (postId) => {
    let path = `/posts/${postId}/edit`;
    history.push(path);
  };

  const deletePost = (postId) => {
    dispatch(deletePostRequest(postId));
  };

  const deleteComment = (comment) => {
    dispatch(deleteCommentRequest(comment));
  };

  const homePage = () => {
    let path = `/`;
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
          {postLoaded ? (
            post.length ? (
              post.map((post) => {
                return (
                  <>
                    {sessionUser && sessionUser.id === post.user_id && (
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
                    {commentsLoaded && (
                      <>
                        <div>{comments.length} comments</div>
                        {sessionUser && <CreateComment post={post} />}
                        {comments.map((comment) => {
                          return (
                            <>
                              <div className="commentDiv">
                                <div className="commenterIconDiv">
                                  <div className="commenterIcon">
                                    <img src={comment.user_profile_image}></img>
                                  </div>
                                </div>
                                <div className="commentContent">
                                  <div className="commentHeader">
                                    <span>{comment.username}</span>
                                    <div className="commentButtons">
                                      {sessionUser &&
                                        sessionUser.id === comment.user_id && (
                                          <div>
                                            <button
                                              className="deleteCommentButton"
                                              onClick={() => {
                                                deleteComment(comment);
                                              }}
                                            >
                                              Delete
                                            </button>
                                            <button
                                              className="editCommentButton"
                                              onClick={() => {
                                                setOpenCommentEditFormId(
                                                  comment.id
                                                );
                                              }}
                                            >
                                              Edit
                                            </button>
                                            {openCommentEditFormId ===
                                              comment.id && (
                                              <EditComment
                                                comment={comment}
                                                onSuccess={() => {
                                                  setOpenCommentEditFormId(
                                                    false
                                                  );
                                                }}
                                              />
                                            )}
                                          </div>
                                        )}
                                    </div>
                                  </div>
                                  <div className="innerCommentDiv">
                                    {comment.text}
                                  </div>
                                  {sessionUser && (
                                    <button
                                      className="replyButton"
                                      onClick={() => {
                                        setOpenCommentReplyFormId(comment.id);
                                      }}
                                    >
                                      Reply
                                    </button>
                                  )}
                                  {openCommentReplyFormId === comment.id && (
                                    <CreateComment
                                      post={post}
                                      replyToId={comment.id}
                                      onSuccess={() => {
                                        setOpenCommentReplyFormId(false);
                                      }}
                                    />
                                  )}
                                </div>
                              </div>
                              {comment.replies.map((reply) => {
                                return (
                                  <>
                                    <div className="replyOuterContainer">
                                      <div>
                                        <AiFillCaretRight />
                                      </div>
                                      <div className="commenterIconDiv">
                                        <div className="commenterIcon">
                                          <img
                                            src={reply.user_profile_image}
                                          ></img>
                                        </div>
                                      </div>
                                      <div className="replyContainer">
                                        <div className="commentHeader">
                                          <span>{reply.username}</span>
                                          <div className="commentButtons">
                                            {sessionUser &&
                                              sessionUser.id ===
                                                reply.user_id && (
                                                <>
                                                  <button
                                                    className="deleteCommentButton"
                                                    onClick={() => {
                                                      deleteComment(reply);
                                                    }}
                                                  >
                                                    Delete
                                                  </button>
                                                  <button
                                                    className="editCommentButton"
                                                    onClick={() => {
                                                      setOpenCommentEditFormId(
                                                        reply.id
                                                      );
                                                    }}
                                                  >
                                                    Edit
                                                  </button>
                                                  {openCommentEditFormId ===
                                                    reply.id && (
                                                    <EditComment
                                                      comment={reply}
                                                      onSuccess={() => {
                                                        setOpenCommentEditFormId(
                                                          false
                                                        );
                                                      }}
                                                    />
                                                  )}
                                                </>
                                              )}
                                          </div>
                                        </div>

                                        <div className="replyText">
                                          {" "}
                                          {reply.text}
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                );
                              })}
                            </>
                          );
                        })}
                      </>
                    )}
                  </>
                );
              })
            ) : (
              <div className="postNotExist">
                <h1>Post deleted / does not exist</h1>
                <div className="goBackHome" onClick={homePage}>
                  <span>Go back to Homepage</span>
                </div>
              </div>
            )
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <div className="rowTwo">
          {subredditLoaded &&
            subredditInfo.map((subreddit) => {
              return (
                <>
                  <div className="subredditInformation">
                    <div className="postPageAboutSubreddit">
                      <img
                        src={subreddit.banner_img}
                        alt="bannerImage"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://i.imgur.com/aQxmKOg.png";
                        }}
                      ></img>
                    </div>
                    <div
                      className="postDescriptionSubredditLogo"
                      onClick={(e) => subredditPage(subreddit.id)}
                    >
                      <img
                        className="subredditLgo"
                        src={subreddit.icon_url}
                        alt="subredditIcon"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://i.imgur.com/hkMSod3.png";
                        }}
                      ></img>
                      <span>r/{subreddit.name}</span>
                    </div>
                    <div className="subredditDescriptionDiv">
                      <div className="subredditDescription">
                        {subreddit.description}
                      </div>
                      {/* <div className="subredditBornDate">{subreddit.created_at}</div> */}
                    </div>
                    <div className="subredditCreatePostDiv">
                      <div
                        className="createSubredditPost"
                        onClick={createPostPage}
                      >
                        {" "}
                        create post
                      </div>
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

export default PostDetails;
