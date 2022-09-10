import React, {useContext} from "react";
import './modal.scss'
import {UserContext} from '../../Context/userContext'
import { FaTimes } from 'react-icons/fa';
import SignUpForm from "../Form/signUpForm";
import SignInForm from "../Form/signInForm";

interface ModalInterface {
  title: string
}
const Modal: React.FC<ModalInterface> = ({ title }) => {
  const { toggleModal } = useContext(UserContext);

  return (
    <div className="modal">
      <FaTimes className="modal__header__closeBtn" onClick={() =>toggleModal("close")}/>
      <div className="modal__header">{title}
      </div>
      <div className="modal__main">
        {title === "Se connecter" ? <SignInForm /> : <SignUpForm />}
      </div>
    </div>
  );
};
export default Modal;
