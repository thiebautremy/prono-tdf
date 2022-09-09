import React, { useRef } from "react";
import "./signForm.scss";
const SignUpForm = () => {
  const signUpFormRef = useRef<HTMLFormElement>(null);
  return (
    <form ref={signUpFormRef} className="signForm signUpForm">
      <input
        type="text"
        name="username"
        id="username"
        placeholder="Nom d'utilisateur"
        className="signForm__input"
      />
      <input type="email" name="email" id="email" placeholder="Email" className="signForm__input"/>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Mot de passe"
        className="signForm__input"
      />
      <button type="submit" className="signForm__btnSubmit">
        Créer un compte
      </button>
    </form>
  );
};
export default SignUpForm;
