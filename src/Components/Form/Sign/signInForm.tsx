import React,{ useRef, useContext} from "react";
import {UserContext} from '../../../Context/userContext'
import ErrorMessage from '../ErrorMessage/errorMessage'
import "./signForm.scss";
const SignInForm = () => {
  const signInFormRef = useRef<HTMLFormElement> (null);
  const {signIn, toggleModal, setSignErrorMessage, signErrorMessage}=useContext(UserContext)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const email = (signInFormRef as any).current[0].value
    const password = (signInFormRef as any).current[1].value
    try {
      const credential: unknown = signIn(
        email, password
      )
      if(credential){
        setSignErrorMessage('')
        toggleModal("close")
      }
    } catch(err){
      console.dir(err)
      if(err) setSignErrorMessage('Email ou mot de passe invalide')
      console.log(signErrorMessage)
    }
  }
  return (
    <form ref={signInFormRef} className="signForm signInForm" onSubmit={(e) => handleSubmit(e)}>
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
      {signErrorMessage !== "" && <ErrorMessage message={signErrorMessage} />}
      <button type="submit" className="signForm__btnSubmit">
        Se connecter
      </button>
    </form>
  );
};
export default SignInForm;
