import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./navBar.scss";

const NavBarAdmin = () => {
  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="navBar">
      <>
        <nav>
          <Link to="/">Retour</Link>
          <Link to="/admin/users">Utilisateurs</Link>
        </nav>
      </>
      <button
        className="navBar__button navBar__logoutBtn"
        onClick={() => logOut()}
      >
        Se déconnecter <FiLogOut className="navBar__logoutBtn__icon" />
      </button>
    </div>
  );
};

export default NavBarAdmin;
