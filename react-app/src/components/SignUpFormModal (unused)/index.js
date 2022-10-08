import React from "react";
import { Modal } from "../../context/Modal";
import SignUpForm from "./SignUpForm";

function SignUpFormModal({ isOpen, modalToggle }) {
  return (
    <>
      {isOpen && (
        <Modal onClose={() => modalToggle(false)}>
          <SignUpForm onClose={() => modalToggle(false)} />
        </Modal>
      )}
    </>
  );
}

export default SignUpFormModal;
