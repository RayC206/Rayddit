import React from "react";
import { Modal } from "../../context/Modal";
import LoginForm from "./LoginForm";

function LoginFormModal({ isOpen, modalToggle }) {
  return (
    <>
      {isOpen && (
        <Modal onClose={() => modalToggle(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
