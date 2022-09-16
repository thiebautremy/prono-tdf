import React, { useContext } from "react";
import { UserContext } from "../../Context/userContext";
import './navBar.scss'
import NavBarConnected from './NavBarConnected/navBarConnected'
import NavBarDisconnected from "./NavBarDisconnected/navBarDisconnected";
const NavBar = () => {
  const { currentUser } = useContext(UserContext);
  console.log(currentUser)
  
  return (
    <div className="navBar">
      {currentUser ? 
        <NavBarConnected />
      :
        <NavBarDisconnected />
      }
    </div>
  );
};
export default NavBar;
