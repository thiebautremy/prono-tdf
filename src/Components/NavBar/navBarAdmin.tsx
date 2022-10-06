import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { FiLogOut } from "react-icons/fi";
import { FaAngleLeft } from "react-icons/fa";
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
    <div className="navBarAdmin">
      <>
        <nav>
          <Link to="/" className="navBar__link">
            <FaAngleLeft />
            Retour
          </Link>
          <Link to="/admin/users" className="navBar__link">
            Utilisateurs
          </Link>
          <Link to="/admin/cyclists" className="navBar__link">
            Cyclistes
          </Link>
          <Link to="/admin/stages" className="navBar__link">
            Etapes
          </Link>
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
