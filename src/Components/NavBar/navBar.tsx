/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable no-prototype-builtins */
import React, { useContext } from "react";
import { UserContext } from "../../Context/userContext";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./navBar.scss";

const NavBar = () => {
  const { currentUser, userConnectedInfo } = useContext(UserContext);
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
        {currentUser && (
          <nav>
            <h2 className="navBar__userName">
              Bonjour
              <span className="navBar__userName--strong">
                {currentUser.displayName}
              </span>
            </h2>

            <Link to="/prono" className="navBar__link">
              Pronostiquer
            </Link>
            <Link to="/results" className="navBar__link">
              Scores / Statistiques
            </Link>
            {userConnectedInfo?.hasOwnProperty("roles") &&
              userConnectedInfo?.roles.some(
                (role) => role === "ADMIN_ROLE"
              ) && (
                <Link to="/admin" className="navBar__link">
                  Administration
                </Link>
              )}
          </nav>
        )}
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

export default NavBar;
