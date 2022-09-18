import { useRef, useContext, useState } from "react";
import ErrorMessage from "./ErrorMessage/errorMessage";
import "./signForm.scss";
import UserContext from "../../Context/userContext";
import { auth } from "../../config/firebaseConfig";
import { updateProfile } from "firebase/auth";
import { getDatabase, ref, set} from "firebase/database";

const SignUpForm = () => {
  const signUpFormRef = useRef<HTMLFormElement>(null);
  const {signUp, toggleModal, signErrorMessage, setSignErrorMessage} = useContext(UserContext)

  function addUserName(userId: any, username: string, email: string) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
      username,
      email
    });
  }
  //TODO ajouter un loader à la soumission du formulaire de création de compte
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const userName = (signUpFormRef as any).current[0].value
    const email = (signUpFormRef as any).current[1].value
    const password = (signUpFormRef as any).current[2].value
    try {
      const credential = await signUp(
          email, password
      )
      if(credential){
        updateProfile((auth.currentUser as any), {
          displayName: userName
        }).then(() => {
          console.log('profil update')
        })
        addUserName(credential.user.uid, userName, email)
        setSignErrorMessage('')
        toggleModal("close")
      }
    } catch(err){
      //TODO afficher les erreurs de retour de firebase à l'utilisateurs
      console.dir(err)
      if((err as any).code === 'auth/invalid-email') setSignErrorMessage("Format d'email invalide")
      if((err as any).code === 'auth/weak-password') setSignErrorMessage("Le mot de passe doit être de 6 caractères minimum")
    }
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
      {signErrorMessage !== '' && <ErrorMessage message={signErrorMessage}/>}
      <button type="submit" className="signForm__btnSubmit">
        Créer un compte
      </button>
    </form>
  );
};
export default SignUpForm;
