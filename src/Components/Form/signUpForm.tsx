import React, { useRef, useContext } from "react";
import "./signForm.scss";
import UserContext from "../../Context/userContext";
import { updateProfile } from "firebase/auth";
import { getDatabase, ref, set} from "firebase/database";
import { auth } from "../../config/firebaseConfig";
const SignUpForm = () => {
  const signUpFormRef = useRef<HTMLFormElement>(null);
  const {signUp} = useContext(UserContext)

  function addUserName(userId: any, username: string, email: string) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
      username,
      email
    });
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const userName = (signUpFormRef as any).current[0].value
    const email = (signUpFormRef as any).current[1].value
    const password = (signUpFormRef as any).current[2].value
    try {
      const credential = await signUp(
          email, password
      )
      console.log(credential);
      if(credential){
        updateProfile((auth.currentUser as any), {
          displayName: userName
        }).then(() => {
          console.log('profil update')
        })
      }
    } catch(err){
      //TODO afficher les erreurs de retour de firebase à l'utilisateurs
      console.log(err)
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
      <button type="submit" className="signForm__btnSubmit">
        Créer un compte
      </button>
    </form>
  );
};
export default SignUpForm;
