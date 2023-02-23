import React, { createContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../config/firebaseConfig";
type UserConnectedInfo = {
  authId: string;
  email: string;
  roles: string[];
  username: string;
  pronos: { number: string; firstname: string; lastname: string }[];
};
interface IContextProps {
  modalState: {
    signIn: boolean;
    signUp: boolean;
  };
  toggleModal: (modal: string) => void;
  signUp: (email: string, password: string) => void;
  signIn: (email: string, password: string) => void;
  setCurrentUser: (newCurrentUser: UserConnectedInfo) => void;
  setSignErrorMessage: (newSignErrorMessage: string) => void;
  currentUser: CurrentUser;
  setUserConnectedInfo: (newUserConnected: CurrentUser) => void;
  userConnectedInfo: UserConnectedInfo;
  signErrorMessage: string;
}

type CurrentUser = {
  displayName: string;
  uid: string;
};
export const UserContext = createContext<IContextProps | undefined>(undefined);

interface Props {
  children: JSX.Element | JSX.Element[];
}
export const UserContextProvider: React.FC<Props> = ({ children }) => {
  //? ===== GESTION MODAL ===== \\
  const [modalState, setModalState] = useState({
    signIn: false,
    signUp: false,
  });
  const [signErrorMessage, setSignErrorMessage] = useState("");

  function toggleModal(modal: string) {
    if (modal === "signIn") {
      setModalState({ signIn: true, signUp: false });
      setSignErrorMessage("");
    }
    if (modal === "signUp") {
      setModalState({ signIn: false, signUp: true });
      setSignErrorMessage("");
    }
    if (modal === "close") {
      setModalState({ signUp: false, signIn: false });
      setSignErrorMessage("");
    }
  }
  //? ===== GESTION INSCRIPTION ===== \\
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [userConnectedInfo, setUserConnectedInfo] =
    useState<UserConnectedInfo | null>();
  const [loadingData, setLoadingData] = useState(true);
  const signUp = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password);

  const signIn = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
      setLoadingData(false);
    });

    return unsubscribe;
  }, []);
  return (
    <UserContext.Provider
      value={{
        modalState,
        toggleModal,
        signUp,
        currentUser,
        setCurrentUser,
        signIn,
        signErrorMessage,
        setSignErrorMessage,
        userConnectedInfo,
        setUserConnectedInfo,
      }}
    >
      {!loadingData && children}
    </UserContext.Provider>
  );
};
export default UserContext;
