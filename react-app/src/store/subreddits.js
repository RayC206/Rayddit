const CREATE_SUBREDDIT = "subreddit/create";
const GET_SUBREDDIT = "subreddit/getsubreddit";
const GET_ALL_SUBREDDITS = "subreddit/getallsubreddits";
const EDIT_SUBREDDIT = "subreddit/edit";
const DELETE_SUBREDDIT = "subreddit/delete"

//Action Creators
const createSubreddit = (subreddit) => {
  return {
    type: CREATE_SUBREDDIT,
    subreddit,
  };
};

const getSubreddit = (subreddit) => {
  return {
    type: GET_SUBREDDIT,
    subreddit,
  };
};

const getAllSubreddits = (subreddits) => {
  return {
    type: GET_ALL_SUBREDDITS,
    subreddits,
  };
};

const editSubreddit = (subreddit) => {
  return {
    type: EDIT_SUBREDDIT,
    subreddit,
  };
};

const deleteSubreddit = (subreddit) => {
  return {
    type: DELETE_SUBREDDIT,
    subreddit,
  };
};


//Thunks

export const createSubredditRequest = (newSubreddit) => async (dispatch) => {
  const res = await fetch("/api/subreddits/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newSubreddit),
  });
  if (res.ok) {
    const subreddit = await res.json();
    dispatch(createSubreddit(subreddit));
    return subreddit;
  } else if (res.status < 500) {
    // error handling
    return await res.json();
  } else {
    return ["An error occurred. Please try again."];
  }
};


//Initial State
let initialState = {};

//Reducer
const subredditReducer = (state = initialState, action) => {
  let newState ={};
  switch (action.type) {
    case CREATE_SUBREDDIT: {
      newState = { ...state };
      newState[action.subreddit.id] = action.subreddit;
      return newState
    }
    default:
      return state;

  }
}

export default subredditReducer;
