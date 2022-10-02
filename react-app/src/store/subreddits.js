const CREATE_SUBREDDIT = "subreddit/create";
const GET_SUBREDDIT = "subreddit/getsubreddit";
const GET_ALL_SUBREDDITS = "subreddit/getAll";
const GET_ALL_USERS_SUBREDDITS = "subreddit/getallUsersSubreddits";
const EDIT_SUBREDDIT = "subreddit/edit";
const DELETE_SUBREDDIT = "subreddit/delete";

//Action Creators
const createSubreddit = (subreddit) => {
  return {
    type: CREATE_SUBREDDIT,
    subreddit,
  };
};

const getAllSubreddits = (subreddits) => {
  return {
    type: GET_ALL_SUBREDDITS,
    subreddits,
  };
};

const getSubreddit = (subreddit) => {
  return {
    type: GET_SUBREDDIT,
    subreddit,
  };
};

const getAllUsersSubreddits = (subreddits) => {
  return {
    type: GET_ALL_USERS_SUBREDDITS,
    subreddits,
  };
};

const editSubreddit = (subreddit) => {
  return {
    type: EDIT_SUBREDDIT,
    subreddit,
  };
};

const deleteSubreddit = (deletedSubredditId) => {
  return {
    type: DELETE_SUBREDDIT,
    deletedSubredditId,
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

// Get all subreddits
export const getAllSubredditsRequest = () => async (dispatch) => {
  const res = await fetch(`/api/subreddits/all`, {});
  if (res.ok) {
    const subreddits = await res.json();
    dispatch(getAllSubreddits(subreddits));
    return subreddits;
  }
  return res;
};

// Get a subreddit by id
export const getSubredditRequest = (subredditId) => async (dispatch) => {
  const res = await fetch(`/api/subreddits/${subredditId}`, {});
  if (res.ok) {
    const subreddit = await res.json();
    dispatch(getSubreddit(subreddit));
    return subreddit;
  }
  return res;
};

// Get all users subreddits
export const getAllUsersSubredditsRequest = () => async (dispatch) => {
  const res = await fetch(`/api/subreddits/subscriptions`, {});
  if (res.ok) {
    const subreddits = await res.json();
    dispatch(getAllUsersSubreddits(subreddits));
    return subreddits;
  }
  return res;
};

//Edit Subreddit
export const editSubredditRequest = (data) => async (dispatch) => {
  const res = await fetch(`/api/subreddits/${data.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    const editedSubreddit = await res.json();
    dispatch(editSubreddit(editedSubreddit));
    return editedSubreddit;
  } else if (res.status < 500) {
    // error handling
    return await res.json();
  } else {
    return ["An error occurred. Please try again."];
  }
};

// Delete Subreddit
export const deleteSubredditRequest = (subredditId) => async (dispatch) => {
  const res = await fetch(`/api/subreddits/${subredditId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(deleteSubreddit(subredditId));
    return subredditId;
  }
  return res;
};

//Initial State
let initialState = {};

//Reducer
const subredditReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case CREATE_SUBREDDIT: {
      newState = { ...state };
      newState[action.subreddit.id] = action.subreddit;
      return newState;
    }
    case GET_ALL_SUBREDDITS: {
      action.subreddits.forEach((subreddit) => {
        newState[subreddit.id] = subreddit;
      });
      return { ...newState };
    }
    case GET_SUBREDDIT: {
      newState = {};
      newState[action.subreddit.id] = action.subreddit;
      return newState;
    }
    case GET_ALL_USERS_SUBREDDITS: {
      action.subreddits.forEach((subreddit) => {
        newState[subreddit.id] = subreddit;
      });
      return { ...newState };
    }
    case EDIT_SUBREDDIT: {
      newState = { ...state };
      newState[action.subreddit.id] = action.subreddit;
      return newState;
    }
    case DELETE_SUBREDDIT: {
      newState = { ...state };
      delete newState[action.deletedSubredditId];
      return newState;
    }
    default:
      return state;
  }
};

export default subredditReducer;
