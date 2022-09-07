import React, { createContext, useState } from "react";

export const NavBarContext = createContext();
export const NavBarContextProvider = (props) => {
  const [modalState, setModalState] = useState({
    signIn: false,
    signUp: false,
  });

  function toggleModal(modal) {
    if (modal === "signIn") setModalState({ signIn: true, signUp: false });
    if (modal === "signUp") setModalState({ signIn: false, signUp: true });
    if (modal === "close") setModalState({ signUp: false, signIn: false });
  }
  return (
    <NavBarContext.Provider value={{ modalState, toggleModal }}>
      {props.children}
    </NavBarContext.Provider>
  );
};
export default NavBarContext;
