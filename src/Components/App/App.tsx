// import { firebaseConfig } from "../../config/firebaseConfig";
// import CyclistCreator from "../CyclistCreator/cyclistCreator";
import Header from "../Header/header";
import { useContext } from "react";
import { UserContext } from "../../Context/userContext";
import Modal from "../Modal/modal";
import HomeDisconnected from "../Home/HomeDisconnected/homeDisconnected";
import './App.scss'
const App = () => {
  const { modalState, currentUser } = useContext(UserContext);
  return (
    <div className="App">
      <Header />
      {modalState.signIn && <Modal title="Se connecter" />}
      {modalState.signUp && <Modal title="Créer un compte" />}
      {/* <CyclistCreator /> */}
      {!currentUser && <HomeDisconnected />}
    </div>
  );
};

export default App;
