// import { firebaseConfig } from "../../config/firebaseConfig";
// import CyclistCreator from "../CyclistCreator/cyclistCreator";
import React, { useContext } from "react";
import { UserContext } from "../../Context/userContext";
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../../Pages/Home/Home";
import Admin from "../../Pages/Admin/Admin";
import Users from "../Admin/Users/users";
const App = () => {
  console.log(useContext(UserContext));
  const { modalState, currentUser } = useContext(UserContext);
  return (
    <div className="App">
      {/* <CyclistCreator /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route
            path="/admin/users"
            element={
              <Admin>
                <Users />
              </Admin>
            }
          />
          {/* <Route index element={<Home />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="contact" element={<Contact />} /> */}
          {/* <Route path="*" element={<h1>404</h1>} /> */}
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
