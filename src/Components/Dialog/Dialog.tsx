import React, { ReactElement } from "react";
import "./Dialog.scss";

interface DialogInterface {
  title: string;
  message: ReactElement;
  handleNo: () => void;
  handleYes: () => void;
}
const Dialog: React.FC<DialogInterface> = ({
  title,
  message,
  handleNo,
  handleYes,
}) => {
  return (
    <div className="dialog__overlay">
      <div className="dialog">
        <p className="dialog__title">{title}</p>
        <div className="dialog__message">{message}</div>
        <button
          onClick={() => handleYes()}
          className="dialog__button dialog__btn-confirm"
        >
          Oui
        </button>
        <button
          onClick={() => handleNo()}
          className="dialog__button dialog__btn-cancel"
        >
          Non
        </button>
      </div>
    </div>
  );
};
export default Dialog;
