import React, { useContext, useEffect } from "react";
import { UserContext } from "../../Context/userContext";
import { signOut } from "firebase/auth";
import app, { auth } from "../../config/firebaseConfig";
import { FiLogOut } from "react-icons/fi";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { Link } from "react-router-dom";
import "./navBar.scss";

const NavBar = () => {
  const { currentUser } = useContext(UserContext);
  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // checkRoles();
  }, []);
  const checkRoles = () => {
    const db = getFirestore(app);
    setDoc(doc(db, "users", currentUser.uid), {
      name: "Los Angeles",
      state: "CA",
      country: "USA",
    });
  };
  return (
    <div className="navBar">
      <>
        {currentUser && (
          <nav>
            <h2 className="navBar__userName">
              Bonjour {currentUser.displayName}
              <span className="navBar__userName--strong"></span>
            </h2>
            <Link to="/admin" className="navBar__link">
              Administration
            </Link>
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
