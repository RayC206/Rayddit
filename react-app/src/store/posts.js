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
