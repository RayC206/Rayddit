import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { createCommentRequest } from "../../store/comments";

const CreateComment = ({ post }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState(null);
  const [errors, setErrors] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  console.log(post.id)

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    let newComment = {
      text: text,
      post_id: post.id,
    };
    return dispatch(createCommentRequest(newComment)).then(async (res) => {
      if (!res.errors) {
        setSubmitSuccess(true);
      } else {
        setErrors(Object.values(res.errors));
      }
    });
  };

  return (
    <div className="commentFormContainer">
      <form onSubmit={handleSubmit}>
        <div className="commentForm">
          <div className="createCommentTitle">Create Comment</div>
          <ul>
            {errors.map((error, idx) => (
              <li className="errorDiv" key={idx}>
                {error}
              </li>
            ))}
          </ul>

          <label>
            <span>Text:</span>
            <textarea
              className="commentTextBox"
              type="text"
              placeholder="Comment message"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </label>
        </div>
        <div className="createCommentButtonDiv">
          <button className="createCommentButton" type="submit">
            Create Comment
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateComment;
