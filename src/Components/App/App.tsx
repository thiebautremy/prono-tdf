import React from "react";
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../../Pages/Home/Home";
import Admin from "../../Pages/Admin/Admin";
import Users from "../Admin/Users/users";
import Cyclists from "../Admin/Cyclists/cyclists";
const App = () => {
  return (
    <div className="App">
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
          <Route
            path="/admin/cyclists"
            element={
              <Admin>
                <Cyclists />
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

export default App;
