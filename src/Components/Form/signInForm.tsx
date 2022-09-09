import React, { useRef } from "react";
import "./signForm.scss";
const SignInForm = () => {
  const signInFormRef = useRef<HTMLFormElement> (null);
  return (
    <form ref={signInFormRef}>
      <input type="email" name="email" id="email" placeholder="email" />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Mot de passe"
      />
      <button type="submit" id="submitForm">
        Se connecter
      </button>
    </form>
  );
};
export default SignInForm;
