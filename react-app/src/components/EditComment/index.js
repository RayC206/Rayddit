import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import './EditComment.css'

import {
  getAllPostCommentsRequest,
  editCommentRequest,
} from "../../store/comments";

const EditComment = ({ comment, onSuccess }) => {
  let { commentId } = useParams();
  commentId = Number(commentId);
  const dispatch = useDispatch();
  // const sessionUser = useSelector((state) => state.session.user);
  const [text, setText] = useState(comment.text);
  const [errors, setErrors] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    let editedComment = {
      id: comment.id,
      text: text,
    };
    return dispatch(editCommentRequest(editedComment)).then(async (res) => {
      if (!res.errors) {
        setSubmitSuccess(true);
        onSuccess();
      } else {
        setErrors(Object.values(res.errors));
      }
    });
  };

  return (
    <div className="editCommentFormContainer">
      <div className="innerEditCommentFormContainer">
        <form className="commentEditForm" onSubmit={handleSubmit}>
          <div>
            <span>Edit Comment:</span>
          </div>
          <ul>
            {errors.map((error, idx) => (
              <li className="errorDiv" key={idx}>
                {error}
              </li>
            ))}
          </ul>
          <div className="editCommentFormInputs">
            <textarea
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className="editCommentButtonDiv">
            <button
              className="cancelEditCommentButton"
              onClick={() => {
                onSuccess();
              }}
            >
              Cancel
            </button>
            <button className="editCommentFormButton" type="submit">
              Edit Comment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditComment;
