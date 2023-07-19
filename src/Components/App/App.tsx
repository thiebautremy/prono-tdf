import React from "react";
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../../Pages/Home/Home";
import Admin from "../../Pages/Admin/Admin";
import Users from "../Admin/Users/users";
import Stages from "../Admin/Stages/Stages";
import Cyclists from "../Admin/Cyclists/cyclists";
import Calculate from "../Admin/Calculate/Calculate";
import Pronos from "../Pronos/Pronos";
import Resultats from "../Resultats/Resultats";
import InformResults from "../Admin/InformResults/InformResults";
import HomeConnected from "../Home/HomeConnected/homeConnected";
import AdminInformations from "../Admin/AdminInformations/AdminInformations";
import Statistiques from "../Statistiques/Statistiques";
import Profil from "../Profil/Profil";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/admin"
            element={
              <Admin>
                <AdminInformations />
              </Admin>
            }
          />
          <Route
            path="/profil"
            element={
              <HomeConnected>
                <Profil />
              </HomeConnected>
            }
          />
          <Route
            path="/prono"
            element={
              <HomeConnected>
                <Pronos />
              </HomeConnected>
            }
          />
          <Route
            path="/results"
            element={
              <HomeConnected>
                <Resultats />
              </HomeConnected>
            }
          />
          <Route
            path="/stats"
            element={
              <HomeConnected>
                <Statistiques />
              </HomeConnected>
            }
          />
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
          <Route
            path="/admin/stages"
            element={
              <Admin>
                <Stages />
              </Admin>
            }
          />
          <Route
            path="/admin/inform-results"
            element={
              <Admin>
                <InformResults />
              </Admin>
            }
          />
          <Route
            path="/admin/calculate"
            element={
              <Admin>
                <Calculate />
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
