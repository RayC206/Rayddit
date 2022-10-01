const CREATE_POST = "posts/create";
const GET_POST = "posts/getpost";
const GET_ALL_POSTS = "posts/getall";
const GET_ALL_SUBREDDITS_POSTS = "subreddit/get_all_subreddits_post";
const GET_USER_POSTS = "posts/getuserposts";
const EDIT_POST = "posts/edit";
const DELETE_POST = "posts/delete";
const UPVOTE_POST = "posts/upvote";
const DOWNVOTE_POST = "posts/downvote";

// Action Creators
const createPost = (post) => {
  return {
    type: CREATE_POST,
    post,
  };
};

const getPost = (post) => {
  return {
    type: GET_POST,
    post,
  };
};

const getAllPosts = (posts) => {
  return {
    type: GET_ALL_POSTS,
    posts,
  };
};

const getAllSubredditsPosts = (posts) => {
  return {
    type: GET_ALL_SUBREDDITS_POSTS,
    posts,
  };
};

const getUserPosts = (posts) => {
  return {
    type: GET_USER_POSTS,
    posts,
  };
};

const editPost = (post) => {
  return {
    type: EDIT_POST,
    post,
  };
};

const deletePost = (deletedPostId) => {
  return {
    type: DELETE_POST,
    deletedPostId,
  };
};

const upvotePost = (post) => {
  return {
    type: UPVOTE_POST,
    post,
  };
};

const downvotePost = (post) => {
  return {
    type: DOWNVOTE_POST,
    post,
  };
};

// Thunks

//Create
export const createPostRequest = (newPost) => async (dispatch) => {
  const res = await fetch("/api/posts/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  });
  if (res.ok) {
    const post = await res.json();
    dispatch(createPost(post));
    return post;
  } else if (res.status < 500) {
    // error handling
    return await res.json();
  } else {
    return ["An error occurred. Please try again."];
  }
};

// Get all posts
export const getAllPostsRequest = () => async (dispatch) => {
  const res = await fetch(`/api/posts/all`, {});
  if (res.ok) {
    const posts = await res.json();
    dispatch(getAllPosts(posts));
    return posts;
  }
  return res;
};

// Get all posts from a subreddit
export const getAllSubredditsPostsRequest =
  (subredditId) => async (dispatch) => {
    const res = await fetch(`/api/subreddits/${subredditId}/posts`, {});
    if (res.ok) {
      const posts = await res.json();
      dispatch(getAllSubredditsPosts(posts));
      // console.log("HERE")
      // console.log(posts)
      return posts;
    }
    return res;
  };

// Get all posts authored by a user (profile)
export const getUserPostsRequest = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}/posts_by_user`, {});
  if (res.ok) {
    const posts = await res.json();
    dispatch(getUserPosts(posts));
    return posts;
  }
  return res;
};

//Load post by id
export const getPostRequest = (postId) => async (dispatch) => {
  const res = await fetch(`/api/posts/${postId}`);
  if (res.ok) {
    const post = await res.json();
    dispatch(getPost(post));
    return post;
  }
  return res;
};

//Edit post
export const editPostRequest = (data) => async (dispatch) => {
  const res = await fetch(`/api/posts/${data.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    const editedPost = await res.json();
    dispatch(editPost(editedPost));
    return editedPost;
  } else if (res.status < 500) {
    // error handling
    return await res.json();
  } else {
    return ["An error occurred. Please try again."];
  }
};

//Delete post
export const deletePostRequest = (postId) => async (dispatch) => {
  const res = await fetch(`/api/posts/${postId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(deletePost(postId));
    return postId;
  }
  return res;
};

// Upvote post
export const upvotePostRequest = (postId) => async (dispatch) => {
  const res = await fetch(`/api/posts/${postId}/upvote`, {
    method: "POST",
  });
  if (res.ok) {
    const post = await res.json();
    dispatch(upvotePost(post));
    return post;
  }
  return res;
};

// Downvote post
export const downvotePostRequest = (postId) => async (dispatch) => {
  const res = await fetch(`/api/posts/${postId}/downvote`, {
    method: "POST",
  });
  if (res.ok) {
    const post = await res.json();
    dispatch(downvotePost(post));
    return post;
  }
  return res;
};

//Initial State
let initialState = {};

//Reducer:
const postsReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case CREATE_POST: {
      newState = { ...state };
      newState[action.post.id] = action.post;
      return newState;
    }
    case GET_POST: {
      newState = {}; // don't return all posts, return only the fetched post
      newState[action.post.id] = action.post;
      return newState;
    }
    case GET_ALL_POSTS: {
      action.posts.forEach((post) => {
        newState[post.id] = post;
      });
      return { ...newState };
    }
    case GET_ALL_SUBREDDITS_POSTS: {
      action.posts.forEach((post) => {
        newState[post.id] = post;
      });
      return { ...newState };
    }
    case GET_USER_POSTS: {
      action.posts.forEach((post) => {
        newState[post.id] = post;
      });
      return { ...newState };
    }
    case EDIT_POST: {
      newState = { ...state };
      newState[action.post.id] = action.post;
      return newState;
    }
    case DELETE_POST: {
      newState = { ...state };
      delete newState[action.deletedPostId];
      return newState;
    }
    case UPVOTE_POST: {
      newState = { ...state };
      newState[action.post.id] = action.post;
      return newState;
    }
    case DOWNVOTE_POST: {
      newState = { ...state };
      newState[action.post.id] = action.post;
      return newState;
    }
    default:
      return state;
  }
};

export default postsReducer;
