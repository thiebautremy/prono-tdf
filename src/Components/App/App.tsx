// import { firebaseConfig } from "../../config/firebaseConfig";
// import CyclistCreator from "../CyclistCreator/cyclistCreator";
import React from 'react'
// import Header from "../Header/header";
import { useContext } from "react";
import { UserContext } from "../../Context/userContext";
import './App.scss'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../../Pages/Home/Home";
import Admin from '../../Pages/Admin/Admin';
const App = () => {
  console.log(useContext(UserContext))
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
          {/* <Route
              path="/"
            element={
              <PrivateRoute currentUser={currentUser}>
                <Admin />
              </PrivateRoute>
            }
          /> */}
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

// interface Props {
//   currentUser: unknown,
//   children: JSX.Element
// }
// const PrivateRoute: React.FC<Props> = ({currentUser, children}) => {
//   return currentUser ? children : <Navigate to="/" />;
// };

export default App;
