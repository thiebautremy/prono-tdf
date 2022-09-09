// import { firebaseConfig } from "../../config/firebaseConfig";
// import CyclistCreator from "../CyclistCreator/cyclistCreator";
import Header from "../Header/header";
import { useContext } from "react";
import { NavBarContext } from "../../Context/navBarContext";
import Modal from "../Modal/modal";
const App = () => {
  const { modalState } = useContext(NavBarContext);
  return (
    <div className="App">
      <Header />
      {modalState.signIn && <Modal title="Se connecter" />}
      {modalState.signUp && <Modal title="Créer un compte" />}
      {/* <CyclistCreator /> */}
    </div>
  );
};

export default App;
