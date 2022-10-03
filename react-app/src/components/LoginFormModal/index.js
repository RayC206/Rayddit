import React from "react";
import { Modal } from "../../context/Modal";
import LoginForm from "./LoginForm";

function LoginFormModal({ isOpen, modalToggle }) {
  console.log("HERE");
  console.log(isOpen);
  return (
    <>
      {isOpen && (
        <Modal onClose={() => modalToggle(false)}>
          <div>jdhfkahkhf</div>
          <LoginForm modalToggle={modalToggle} />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
