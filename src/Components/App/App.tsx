// import { firebaseConfig } from "../../config/firebaseConfig";
// import CyclistCreator from "../CyclistCreator/cyclistCreator";
import Header from "../Header/header";
import { useContext } from "react";
import { UserContext } from "../../Context/userContext";
import './App.scss'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../../Pages/Home/Home";
const App = () => {
  const { modalState, currentUser } = useContext(UserContext);
  return (
    <div className="App">
      {/* <Header />
      {modalState.signIn && <Modal title="Se connecter" />}
      {modalState.signUp && <Modal title="Créer un compte" />}
      {/* <CyclistCreator /> */}
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            {/* <Route index element={<Home />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="contact" element={<Contact />} /> */}
            {/* <Route path="*" element={<h1>404</h1>} /> */}
          </Route>
        </Routes>
     </BrowserRouter>
    </div>
  );
};

export default App;
