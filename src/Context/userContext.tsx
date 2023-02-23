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
  setCurrentUser: (param: UserConnectedInfo) => void;
  setSignErrorMessage: (param: string) => void;
  currentUser: { displayName: string; uid: string };
  setUserConnectedInfo: (param: unknown) => void;
  users: [string];
  userConnectedInfo: UserConnectedInfo;
  setUsers: (param: unknown) => void;
  signErrorMessage: string;
}
export const UserContext = createContext({} as IContextProps);

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
  const [currentUser, setCurrentUser] =
    useState<IContextProps["currentUser"]>();
  const [userConnectedInfo, setUserConnectedInfo] = useState({});
  const [users, setUsers] = useState({});
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
        users,
        setUsers,
      }}
    >
      {!loadingData && children}
    </UserContext.Provider>
  );
};
export default UserContext;
