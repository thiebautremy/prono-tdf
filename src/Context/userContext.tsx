import React, { createContext, useState } from "react";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword,onAuthStateChanged} from 'firebase/auth'
import {auth} from '../config/firebaseConfig'
interface IContextProps {
  modalState: {
    signIn: boolean,
    signUp: boolean
  },
  toggleModal:Function,
  signUp:Function,
}
export const UserContext = createContext({} as IContextProps);

export const UserContextProvider: React.FC = ({children}: any) => {
  //? ===== GESTION MODAL ===== \\
  const [modalState, setModalState] = useState({
    signIn: false,
    signUp: false,
  });
  function toggleModal(modal: string) {
    if (modal === "signIn") setModalState({ signIn: true, signUp: false });
    if (modal === "signUp") setModalState({ signIn: false, signUp: true });
    if (modal === "close") setModalState({ signUp: false, signIn: false });
  }
  //? ===== GESTION INSCRIPTION ===== \\
  const [currentUser, setCurrentUser] = useState()
  const [loadingData, setLoadingData] = useState(true)
  const signUp = (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password)
  return (
    <UserContext.Provider value={{ modalState, toggleModal, signUp }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserContext;
