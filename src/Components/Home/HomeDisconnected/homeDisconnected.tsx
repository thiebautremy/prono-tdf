import React, {useContext} from 'react'
import {UserContext} from '../../../Context/userContext'
import Modal from '../../Modal/modal'
import './homeDisconnected.scss'
const HomeDisconnected = () => {
    const {toggleModal, modalState} = useContext(UserContext);
    console.log(useContext(UserContext))
    return(
        <main className='homeDisconnected'>
            <section className="homeDisconnected__picture"></section>
            <section className="homeDisconnected__intro">
                <div className='homeDisconnected__intro__forms'>
                    {modalState.signIn && <Modal title="Se connecter" />}
                    {modalState.signUp && <Modal title="Créer un compte" />}
                    {!modalState.signIn && !modalState.signUp && <ModalIntro />}
                </div>
                <button 
                    className="homeDisconnected__intro__button" 
                    onClick={() => toggleModal("signIn")}>Se connecter
                </button>
                <button 
                    className="homeDisconnected__intro__button" 
                    onClick={() => toggleModal("signUp")}>Créer un compte
                </button>
            </section>
        </main>
    )
}

const ModalIntro = () => {
    return (
        <div className="modalIntro">
            <p>Pronostiquer sur vos favoris pour chaque étape du tour de France</p>
            <p>Sélectionner 5 coureurs par étape</p>
            <p>Vos coureurs sélectionnés sont dans les 20 premiers du classement de l&apos; étape ? <br/>Vous gagnez des points !!</p>
        </div>
    )
}

export default HomeDisconnected