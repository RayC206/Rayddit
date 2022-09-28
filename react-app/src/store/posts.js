const CREATE_POST = "posts/create";
const GET_POST = "posts/getpost";
const GET_ALL_POST = "posts/getall";
const EDIT_POST = "posts/edit";
const DELETE_POST = "posts/delete";
const UPVOTE_POST = "posts/upvote";
const DOWNVOTE_POST = "posts/downvote";


// Action Creators
const createPost = (post) => {
  return {
    type: CREATE_POST,
    post
  };
};

const loadPost = (post) => {
  return {
    type: GET_POST,
    post
  };
};

const loadAllPost = (post) => {
  return {
    type: GET_ALL_POST,
    post
  };
};

const updatePost = (post) => {
  return {
    type: EDIT_POST,
    post
  };
};

const removePost = (postId) => {
  return {
    type: DELETE_POST,
    postId
  };
};


// Thunks

//Create
export const createAPost = (newPost) => async (dispatch) => {
  const res = await fetch("/api/posts/", {
    method: "POST",
    headers: {"Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  });
  if (res.ok) {
    const post = await res.json();
    dispatch(createPost(post));
    return post
  }
  return res
}

//Load all posts
export const getAllPosts = () => async (dispatch) => {
  const res = await fetch(`/api/posts/all`, {});
  if (res.ok) {
    const data = await res.json();
    dispatch(loadAllPost(data));
    return data
  };
  return res
};

//Load post by id
export const loadSinglePost = (postId) => async (dispatch) => {
  const res = await fetch(`/api/posts/${postId}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(loadPost(data));
    return data
  };
  return res
};

//Edit post
export const editPost = (data) => async (dispatch) => {
  const res = await fetch(`/api/posts/${data.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (res.ok) {
    const editedPost = await res.json()
    dispatch(updatePost(editedPost))
    return editedPost
  };
  return res
};

//Delete post
export const deletePost = (postId) => async (dispatch) => {
  const res = await fetch(`/api/posts/${postId}`, {
    method: "DELETE"
  });
  if (res.ok){
    dispatch(removePost(postId));
  };
  return res
};

//Initial State
const initialState = {}

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
      newState = { ...state };
      newState[action.post.id] = action.post;
      return newState;
    }
    case GET_ALL_POST: {
      action.posts.forEach((post) => {
        newState[post.id] = post;
      });
      return newState;
    }
    case EDIT_POST: {
      newState = { ...state };
      newState[action.post.id] = action.post;
      return newState;
    }
    case DELETE_POST: {
      newState = { ...state };
      delete newState[action.postId];
      return newState;
    }
    default:
      return state;
  }
};

export default postsReducer;
