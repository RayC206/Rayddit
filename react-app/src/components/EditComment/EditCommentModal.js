import React from "react";
import { Modal } from "../../context/Modal";
import EditComment from "./index";

function EditCommentModal({ isOpen, modalToggle }) {
  return (
    <>
      {isOpen && (
        <Modal onClose={() => modalToggle(false)}>
          <EditComment onClose={() => modalToggle(false)} />
        </Modal>
      )}
    </>
  );
}

export default EditCommentModal;
