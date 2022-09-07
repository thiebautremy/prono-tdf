import React from "react";
import SignInForm from "../Form/signInForm";
import SignUpForm from "../Form/signUpForm";
const Modal = ({ title }) => {
  return (
    <div className="modal">
      <div className="modal__header">{title}</div>
      <div className="modal__main">
        {title === "Se connecter" ? <SignInForm /> : <SignUpForm />}
      </div>
    </div>
  );
};
export default Modal;
