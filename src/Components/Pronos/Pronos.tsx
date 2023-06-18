/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useContext, useEffect, useState } from "react";
import { StagesContext, IStage } from "../../Context/stagesContext";
import { CyclistsContext } from "../../Context/cyclistsContext";
import {
  getFirestore,
  collection,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import app from "../../config/firebaseConfig";
import Stage from "../Admin/Stages/Stage/Stage";
import { Dropdown, DropdownChangeParams } from "primereact/dropdown";
import Prono from "./Prono/prono";
import "./pronos.scss";

const Pronos = () => {
  const [isOpenCyclistList, setIsOpenCyclistList] = useState(false);
  const { cyclists, setCyclists } = useContext(CyclistsContext);
  const db = getFirestore(app);
  const { stages, setStages } = useContext(StagesContext);
  const fetchStages = async () => {
    const datas: DocumentData = [];
    try {
      const querySnapshot = await getDocs(collection(db, "stages"));
      const response = querySnapshot;
      if (response) {
        response.forEach((doc) => {
          datas.push(doc.data());
          setStages(datas);
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
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
    fetchStages();
    fetchCyclists();
  }, []);
  const [selectedStage, setSelectedStage] = useState<IStage | null>(null);
  const onStageChange = (e: DropdownChangeParams) => {
    const stageFound = stages.find((stage) => stage.stageId === e.value.code);
    setSelectedStage(stageFound);
  };

  const formatedArrayStagesForDropDown = (
    arrayToChanged: { stageId: number; startCity: string; endCity: string }[]
  ) => {
    //TODO ajouter si l'étape est finie ou en cours dans les options du select en fonction de la date et de l'heure !
    const arrayFormated = [];
    for (let i = 0; i < arrayToChanged.length; i++) {
      const object: { stage: string; code: number | null } = {
        stage: "",
        code: null,
      };
      object.stage = `Etape n°${arrayToChanged[i].stageId} : ${arrayToChanged[i].startCity} - ${arrayToChanged[i].endCity}`;
      object.code = arrayToChanged[i].stageId;
      arrayFormated.push(object);
    }
    return arrayFormated.sort(function (a, b) {
      return a.code - b.code;
    });
  };

  return (
    <div className="pronos">
      <div className="pronos__header">
        <h1 className="pronos__header__title">
          Sélectionner une étape pour pronostiquer
        </h1>
        {stages.length > 0 && (
          <Dropdown
            value={selectedStage}
            options={formatedArrayStagesForDropDown(stages)}
            onChange={onStageChange}
            optionLabel="stage"
            placeholder="Sélectionne une étape"
          />
        )}
      </div>
      <div className="pronos__main">
        {selectedStage !== null && (
          <div className="pronos__stage">
            <Stage stage={selectedStage} />{" "}
            <button
              onClick={() => setIsOpenCyclistList(true)}
              className="pronos__setPronoBtn"
            >
              Pronostiquer sur cette étape
            </button>
          </div>
        )}
        {isOpenCyclistList && cyclists.length > 0 && (
          <Prono cyclists={cyclists} stageId={selectedStage.stageId} />
        )}
      </div>
    </div>
  );
};

export default Pronos;
