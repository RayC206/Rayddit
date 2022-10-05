import React from "react";
import { Modal } from "../../context/Modal";
import EditSubreddit from "./index";

function EditSubredditModal({ isOpen, modalToggle }) {
  return (
    <>
      {isOpen && (
        <Modal onClose={() => modalToggle(false)}>
          <EditSubreddit onClose={() => modalToggle(false)} />
        </Modal>
      )}
    </>
  );
}

export default EditSubredditModal;
