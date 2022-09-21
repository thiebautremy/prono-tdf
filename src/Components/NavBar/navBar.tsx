import React, { useContext } from "react";
import { UserContext } from "../../Context/userContext";
import './navBar.scss'
import NavBarConnected from './NavBarConnected/navBarConnected'
const NavBar = () => {
  const { currentUser } = useContext(UserContext);
  console.log(currentUser)
  
  return (
    <div className="navBar">
      {currentUser &&
        <NavBarConnected />
      }
    </div>
  );
};
export default NavBar;
