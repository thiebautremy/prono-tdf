import React, { useContext } from "react";
import { UserContext } from "../../Context/userContext";
import './navBar.scss'
const NavBar = () => {
  console.log(useContext(UserContext));
  const { toggleModal } = useContext(UserContext);
  return (
    <div className="navBar">
      <button className="navBar__button" onClick={() => toggleModal("signIn")}>Se connecter</button>
      <button className="navBar__button" onClick={() => toggleModal("signUp")}>Créer un compte</button>
      <button className="navBar__button" onClick={() => toggleModal("close")}>Se déconnecter</button>
    </div>
  );
};
export default NavBar;
