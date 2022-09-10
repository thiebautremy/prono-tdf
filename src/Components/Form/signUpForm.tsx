import React, { useRef, useContext } from "react";
import { ObjectType } from "typescript";
import UserContext from "../../Context/userContext";
import "./signForm.scss";
const SignUpForm = () => {
  const signUpFormRef = useRef<HTMLFormElement>(null);
  const {signUp} = useContext(UserContext)
  const handleSubmit = (e: any) => {
    e.preventDefault()
    const userName = (signUpFormRef as any).current[0].value
    const email = (signUpFormRef as any).current[1].value
    const password = (signUpFormRef as any).current[2].value
    console.log(e)
    console.log({userName})
    console.log({email})
    console.log({password})
    // try {
    //   const credential = await signUp(

    //   )
    // } catch(err){

    // }
  }
  return (
    <form ref={signUpFormRef} className="signForm signUpForm" onSubmit={(e) => handleSubmit(e)}>
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
