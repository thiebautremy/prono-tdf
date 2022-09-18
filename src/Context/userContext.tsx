import React, { createContext, useEffect, useState } from "react";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword,onAuthStateChanged} from 'firebase/auth'
import {auth} from '../config/firebaseConfig'
interface IContextProps {
  modalState: {
    signIn: boolean,
    signUp: boolean
  },
  toggleModal:Function,
  signUp:Function,
  signIn:Function,
  setCurrentUser:Function,
  setSignErrorMessage: Function
  currentUser: any,
  signErrorMessage: string,
}
export const UserContext = createContext({} as IContextProps);

export const UserContextProvider: React.FC = ({children}: any) => {
  //? ===== GESTION MODAL ===== \\
  const [modalState, setModalState] = useState({
    signIn: false,
    signUp: false,
  });
  const [signErrorMessage, setSignErrorMessage] = useState("")

  function toggleModal(modal: string) {
    if (modal === "signIn") {
      setModalState({ signIn: true, signUp: false }) 
      setSignErrorMessage('')
    };
    if (modal === "signUp") {
      setModalState({ signIn: false, signUp: true })
      setSignErrorMessage('')
    };
    if (modal === "close") {
      setModalState({ signUp: false, signIn: false })
      setSignErrorMessage('')
    }
  }
  //? ===== GESTION INSCRIPTION ===== \\
  const [currentUser, setCurrentUser] = useState({} as any)
  const [loadingData, setLoadingData] = useState(true)
  const signUp = (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password)

  const signIn = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser)
      setLoadingData(false)
    })

    return unsubscribe
  }, [])
  return (
    <UserContext.Provider value={{ modalState, toggleModal, signUp, currentUser, setCurrentUser, signIn, signErrorMessage, setSignErrorMessage }}>
      {!loadingData && children}
    </UserContext.Provider>
  );
};
export default UserContext;
