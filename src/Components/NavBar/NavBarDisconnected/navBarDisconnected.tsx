import React, {useContext} from 'react'
import {UserContext} from '../../../Context/userContext'

const NavBarDisconnected = () => {
    const {toggleModal} = useContext(UserContext);

    return(
        <>
        <button className="navBar__button" onClick={() => toggleModal("signIn")}>Se connecter</button>
        <button className="navBar__button" onClick={() => toggleModal("signUp")}>Créer un compte</button>
      </>
    )
}

export default NavBarDisconnected;