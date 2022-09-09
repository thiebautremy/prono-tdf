import React, { useContext } from "react";
import { NavBarContext } from "../../Context/navBarContext";
const NavBar = () => {
  console.log(useContext(NavBarContext));
  const { toggleModal } = useContext(NavBarContext);
  return (
    <div className="navBar">
      <button onClick={() => toggleModal("signIn")}>Se connecter</button>
      <button onClick={() => toggleModal("signUp")}>Créer un compte</button>
      <button onClick={() => toggleModal("close")}>Se déconnecter</button>
    </div>
  );
};
export default NavBar;
