import React from "react";
import { FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./navBar.scss";

const NavBarAdmin = () => {
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
    </div>
  );
};

export default NavBarAdmin;
