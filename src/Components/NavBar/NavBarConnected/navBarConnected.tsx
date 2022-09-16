import React, {useContext} from 'react'
import {UserContext} from '../../../Context/userContext'
import { signOut } from "firebase/auth";
import { auth } from "../../../config/firebaseConfig";
import { FiLogOut } from "react-icons/fi"


const NavBarConnected = () => {
    const {currentUser} = useContext(UserContext)
    const logOut= async () => {
        try{
          await signOut(auth)
        } catch(err){
          console.log(err)
        }
      }
    return(
        <div className="navBarConnected">
      {currentUser && 
        <h2 className="navBarConnected__userName">
            Bonjour <span className="navBarConnected__userName--strong">{currentUser.displayName}</span>
        </h2>
        }
      <button className="navBar__button" onClick={() => logOut()}>Se déconnecter <FiLogOut /></button>
      </div>
    )
}

export default NavBarConnected