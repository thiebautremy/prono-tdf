import React, { useContext } from "react";
import { NavBarContext } from "../../Context/navBarContext";
import './navBar.scss'
const NavBar = () => {
  console.log(useContext(NavBarContext));
  const { toggleModal } = useContext(NavBarContext);
  return (
    <div className="navBar">
      <button className="navBar__button" onClick={() => toggleModal("signIn")}>Se connecter</button>
      <button className="navBar__button" onClick={() => toggleModal("signUp")}>Créer un compte</button>
      <button className="navBar__button" onClick={() => toggleModal("close")}>Se déconnecter</button>
    </div>
  );
};
export default NavBar;
