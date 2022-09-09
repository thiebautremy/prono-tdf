import React, { useRef } from "react";
import "./signForm.scss";
const SignUpForm = () => {
  const signUpFormRef = useRef<HTMLFormElement>(null);
  return (
    <form ref={signUpFormRef}>
      <input
        type="text"
        name="username"
        id="username"
        placeholder="Nom d'utilisateur"
      />
      <input type="email" name="email" id="email" placeholder="email" />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Mot de passe"
      />
      <button type="submit" id="submitForm">
        Créer un compte
      </button>
    </form>
  );
};
export default SignUpForm;
