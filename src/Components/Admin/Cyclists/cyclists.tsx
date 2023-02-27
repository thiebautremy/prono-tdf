/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useContext } from "react";
import Cyclist from "./Cyclist/cyclist";
import { CyclistsContext } from "../../../Context/cyclistsContext";
import app from "../../../config/firebaseConfig";
import {
  getFirestore,
  collection,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import AddCyclistForm from "./AddCyclistForm/addCyclistForm";
import "./cyclists.scss";

const Cyclists = () => {
  const db = getFirestore(app);
  const { cyclists, setCyclists } = useContext(CyclistsContext);
  //TODO Faire la liste des coureurs avec à droite avec une petite poubelle pour les supprimer facilement
  const fetchCyclists = async () => {
    const datas: DocumentData = [];
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
      <div className="cyclists__container">
        <h1 className="cyclists__container__title">
          Liste des cyclistes participants :
        </h1>
        {cyclists.length > 0 &&
          cyclists
            .sort((a, b) => Number(a.number) - Number(b.number))
            .map((cyclist) => <Cyclist key={cyclist.number} {...cyclist} />)}
      </div>
    </div>
  );
};
export default Cyclists;
