import React, { useEffect, useContext, useState } from "react";
import { StagesContext } from "../../../Context/stagesContext";
import { CyclistsContext } from "../../../Context/cyclistsContext";
import {
  getFirestore,
  collection,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import app from "../../../config/firebaseConfig";
import { Dropdown, DropdownChangeParams } from "primereact/dropdown";
import { getDateFormated } from "../../../Services/functions";
import Stage from "../Stages/Stage/Stage";
import InformResult from "./InformResult/InformResult";

const InformResults = () => {
  const [isOpenCyclistList, setIsOpenCyclistList] = useState(false);
  const { cyclists, setCyclists } = useContext(CyclistsContext);
  const { stages, setStages } = useContext(StagesContext);
  const db = getFirestore(app);

  const fetchStages = async () => {
    const datas: [] = [];
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
    fetchStages();
    fetchCyclists();
  }, []);
  const formatedDateFromFirebase = (date: {
    seconds: number;
    nanoseconds: number;
  }) => {
    const timeObj = new Timestamp(date.seconds, date.nanoseconds);
    const dateAndHour = timeObj.toDate();
    return dateAndHour.toUTCString();
  };
  const formatedArrayStagesForDropDown = (arrayToChanged) => {
    const arrayFormated = [];
    for (let i = 0; i < arrayToChanged.length; i++) {
      const object = {};
      const { date } = getDateFormated(arrayToChanged[i].date);
      object.stage = `Etape n°${arrayToChanged[i].stageId} : ${arrayToChanged[i].startCity} - ${arrayToChanged[i].endCity} le ${date}`;
      object.code = arrayToChanged[i].stageId;
      object.date = formatedDateFromFirebase(arrayToChanged[i].date);
      arrayFormated.push(object);
    }
    return arrayFormated;
  };
  const [selectedStage, setSelectedStage] = useState(null);
  const onStageChange = (e: DropdownChangeParams) => {
    const stageFound = stages.find((stage) => stage.stageId === e.value.code);
    setSelectedStage(stageFound);
  };
  return (
    <div className="informResults">
      <h1>Renseigner les résultats</h1>
      {stages.length > 0 && (
        <Dropdown
          value={selectedStage}
          options={formatedArrayStagesForDropDown(stages)}
          onChange={onStageChange}
          optionDisabled={(option) =>
            new Date(Date.now()).toUTCString() > option.date
          }
          optionLabel="stage"
          placeholder="Sélectionne une étape"
        />
      )}
      {selectedStage !== null && (
        <div className="pronos__stage">
          <Stage stage={selectedStage} />{" "}
          <button
            onClick={setIsOpenCyclistList}
            className="pronos__setPronoBtn"
          >
            Ajouter les résultats de l'étape
          </button>
        </div>
      )}
      {isOpenCyclistList && cyclists.length > 0 && (
        <InformResult cyclists={cyclists} stageId={selectedStage.stageId} />
      )}
    </div>
  );
};
export default InformResults;
