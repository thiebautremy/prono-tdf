/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useRef, useContext, FormEvent } from "react";
import { UserContext } from "../../../Context/userContext";
import ErrorMessage from "../ErrorMessage/errorMessage";
import "./signForm.scss";
const SignInForm = () => {
  const signInFormRef = useRef<HTMLFormElement>(null);
  const { signIn, toggleModal, setSignErrorMessage, signErrorMessage } =
    useContext(UserContext);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const email: string = signInFormRef.current[0].value;
    const password: string = signInFormRef.current[1].value;
    try {
      const credential: unknown = signIn(email, password);
      if (credential) {
        setSignErrorMessage("");
        toggleModal("close");
      }
    } catch (err) {
      if (err) setSignErrorMessage("Email ou mot de passe invalide");
    }
  };
  return (
    <form
      ref={signInFormRef}
      className="signForm signInForm"
      onSubmit={(e) => handleSubmit(e)}
    >
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        className="signForm__input"
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Mot de passe"
        className="signForm__input"
      />
      {signErrorMessage !== "" && <ErrorMessage message={signErrorMessage} />}
      <button type="submit" className="signForm__btnSubmit">
        Se connecter
      </button>
    </form>
  );
};
export default SignInForm;
