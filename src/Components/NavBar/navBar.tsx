import React, {useContext} from 'react'
import {UserContext} from '../../Context/userContext'
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { FiLogOut } from "react-icons/fi"
import './navBar.scss'

const NavBar = () => {
    const {currentUser} = useContext(UserContext)
    const logOut= async () => {
        try{
          await signOut(auth)
        } catch(err){
          console.log(err)
        }
      }
      console.log(currentUser)
    return(
        <div className="navBar">
          <>
            {currentUser && 
              <h2 className="navBar__userName">
                  Bonjour {currentUser.displayName}<span className="navBar__userName--strong"></span>
              </h2>
              }
          </>
          <button className="navBar__button navBar__logoutBtn" onClick={() => logOut()}>Se déconnecter <FiLogOut className='navBar__logoutBtn__icon'/></button>
      </div>
    )
}

export default NavBar