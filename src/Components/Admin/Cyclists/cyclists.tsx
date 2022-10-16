import React, { useEffect, useState, useContext } from "react";
import { CyclistsContext } from "../../../Context/cyclistsContext";
import app from "../../../config/firebaseConfig";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import AddCyclistForm from "./addCyclistForm";
import "./cyclists.scss";
interface CyclistInterface {
  lastname: string;
  number: number;
  team: string;
  firstname: string;
  nationality: string;
}
const Cyclists = () => {
  const db = getFirestore(app);
  const { cyclists, setCyclists } = useContext(CyclistsContext);
  //TODO Faire un formulaire d'ajout sur le côté gauche
  //TODO Faire la liste des coureurs à droite avec une petite poubelle pour les supprimer facilement
  const fetchCyclists = async () => {
    const datas: [] = [];
    try {
      const querySnapshot = await getDocs(collection(db, "cyclists"));
      const response = querySnapshot;
      if (response) {
        response.forEach((doc) => {
          datas.push(doc.data());
          setCyclists(datas);
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchCyclists();
  }, []);
  return (
    <div className="cyclists">
      <AddCyclistForm fetchCyclists={fetchCyclists} />
      {cyclists.length > 0 &&
        cyclists.map((cyclist: CyclistInterface) => (
          <div key={cyclist.number}>
            <p>{cyclist.firstname}</p>
            <p>{cyclist.lastname}</p>
            <p>{cyclist.nationality}</p>
            <p>{cyclist.team}</p>
            <p>{cyclist.number}</p>
          </div>
        ))}
    </div>
  );
};
export default Cyclists;
