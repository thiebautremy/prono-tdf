import React from "react";
import NavBar from "../../NavBar/navBar";

const HomeConnected: React.FC = () => {
  //TODO Fetch les users, les enregistrer dans un adminContext à créer filtrer ensuite le tableau des users pour savoir si le userInfo === currentUser avec le authId présent dans la table users
  return (
    <>
      <NavBar />
    </>
  );
};

export default HomeConnected;
