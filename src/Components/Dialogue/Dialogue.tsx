import React, { useEffect } from "react";
import "./Dialogue.scss";

interface IDialogue {
  isVisible: boolean;
  setIsVisible: (boolean: boolean) => void;
  message: string;
}

const Dialogue = ({ isVisible, setIsVisible, message }: IDialogue) => {
  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false);
    }, 6000);
  }, [isVisible]);
  return isVisible && <div className="dialogue">{message}</div>;
};

export default Dialogue;
