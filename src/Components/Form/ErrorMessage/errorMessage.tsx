import React from "react";
import "./errorMessage.scss";

type ErrorMessageProps = {
  message: string;
};
const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return <h5 className="errorMessage">{message}</h5>;
};

export default ErrorMessage;
