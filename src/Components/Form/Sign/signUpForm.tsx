/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useRef, useContext, FormEvent } from "react";
import ErrorMessage from "../ErrorMessage/errorMessage";
import "./signForm.scss";
import UserContext from "../../../Context/userContext";
import app, { auth } from "../../../config/firebaseConfig";
import { updateProfile } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";

const SignUpForm = () => {
  const signUpFormRef = useRef<HTMLFormElement>(null);
  const { signUp, toggleModal, signErrorMessage, setSignErrorMessage } =
    useContext(UserContext);

  const addUserNameAndRole = async (
    authId: number,
    username: string,
    email: string
  ) => {
    const db = getFirestore(app);
    await setDoc(doc(db, "users", authId), {
      authId,
      username,
      email,
      roles: ["USER_ROLE"],
    });
  };

  //TODO ajouter un loader à la soumission du formulaire de création de compte
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const userName = (signUpFormRef as any).current[0].value;
    const email = (signUpFormRef as any).current[1].value;
    const password = (signUpFormRef as any).current[2].value;
    // try {
    const credentialPromise = new Promise(function (myResolve, myReject) {
      myResolve(signUp(email, password));
      myReject("Error");
    });

    credentialPromise
      .then(function (success: any) {
        updateProfile(auth.currentUser as any, {
          displayName: userName,
        })
          .then(() => {
            console.log(success);
            console.log("profil update");
            if (typeof success === "object" && success !== null) {
              addUserNameAndRole(success.user.uid, userName, email);
            }
            setSignErrorMessage("");
            toggleModal("close");
          })
          .catch((err) => console.log(err));
      })
      .catch(function (error) {
        if (error.code === "auth/invalid-email")
          setSignErrorMessage("Format d'email invalide");
        if (error.code === "auth/weak-password")
          setSignErrorMessage(
            "Le mot de passe doit être de 6 caractères minimum"
          );
      });
  };

  // }
  return (
    <form
      ref={signUpFormRef}
      className="signForm signUpForm"
      onSubmit={(e) => handleSubmit(e)}
    >
      <input
        type="text"
        name="username"
        id="username"
        placeholder="Nom d'utilisateur"
        className="signForm__input"
      />
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
        Créer un compte
      </button>
    </form>
  );
};
export default SignUpForm;
