import React, { createContext, useState } from "react";

interface IContextProps {
  modalState: {
    signIn: boolean,
    signUp: boolean
  },
  toggleModal:Function
}
export const NavBarContext = createContext({} as IContextProps);
export const NavBarContextProvider: React.FC = ({children}: any) => {
  const [modalState, setModalState] = useState({
    signIn: false,
    signUp: false,
  });

  function toggleModal(modal: string) {
    if (modal === "signIn") setModalState({ signIn: true, signUp: false });
    if (modal === "signUp") setModalState({ signIn: false, signUp: true });
    if (modal === "close") setModalState({ signUp: false, signIn: false });
  }
  return (
    <NavBarContext.Provider value={{ modalState, toggleModal }}>
      {children}
    </NavBarContext.Provider>
  );
};
export default NavBarContext;
