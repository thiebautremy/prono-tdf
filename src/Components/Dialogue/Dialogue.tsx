import React, { useEffect } from "react";
import "./Dialogue.scss";

const Dialogue = ({ isVisible, setIsVisible, message }) => {
  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false);
    }, 4000);
  }, [isVisible]);
  return isVisible && <div className="dialogue">{message}</div>;
};

export default Dialogue;
