import React, { useRef } from "react";
import "./signForm.scss";
const SignInForm = () => {
  const signInFormRef = useRef<HTMLFormElement> (null);
  return (
    <form ref={signInFormRef} className="signForm signInForm">
      <input 
      type="email" 
      name="email" 
      id="email" 
      placeholder="Email"
      className="signForm__input"/>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Mot de passe"
        className="signForm__input"
      />
      <button type="submit" className="signForm__btnSubmit">
        Se connecter
      </button>
    </form>
  );
};
export default SignInForm;
