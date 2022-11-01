import React, { useContext, useEffect, useState } from "react";
import { StagesContext } from "../../Context/stagesContext";
import { CyclistsContext } from "../../Context/cyclistsContext";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from "../../config/firebaseConfig";
import Stage from "../Admin/Stages/Stage/Stage";
import { Dropdown, DropdownChangeParams } from "primereact/dropdown";
import Prono from "./Prono/prono";

const Pronos = () => {
  const [isOpenCyclistList, setIsOpenCyclistList] = useState(false);
  const { cyclists, setCyclists } = useContext(CyclistsContext);
  const db = getFirestore(app);
  const { stages, setStages } = useContext(StagesContext);
  const fetchStages = async () => {
    const datas: [] = [];
    try {
      const querySnapshot = await getDocs(collection(db, "stages"));
      const response = querySnapshot;
      if (response) {
        response.forEach((doc) => {
          datas.push(doc.data());
          console.log(datas);
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
  const [selectedStage, setSelectedStage] = useState(null);
  const onStageChange = (e: DropdownChangeParams) => {
    const stageFound = stages.find((stage) => stage.stageId === e.value.code);
    setSelectedStage(stageFound);
  };

  const formatedArrayStagesForDropDown = (arrayToChanged) => {
    //TODO ajouter si l'étape est finie ou en cours dans les options du select
    const arrayFormated = [];
    for (let i = 0; i < arrayToChanged.length; i++) {
      const object = {};
      object.stage = `Etape n°${arrayToChanged[i].stageId} : ${arrayToChanged[i].startCity} - ${arrayToChanged[i].endCity}`;
      object.code = arrayToChanged[i].stageId;
      arrayFormated.push(object);
    }
    return arrayFormated;
  };

  return (
    <div className="pronos">
      <h1>Prono</h1>
      {stages.length > 0 && (
        <Dropdown
          value={selectedStage}
          options={formatedArrayStagesForDropDown(stages)}
          onChange={onStageChange}
          optionLabel="stage"
          placeholder="Sélectionne une étape"
        />
      )}
      {selectedStage !== null && (
        <div>
          <Stage stage={selectedStage} />{" "}
          <button onClick={setIsOpenCyclistList}>
            Pronostiquer sur cette étape
          </button>
        </div>
      )}
      {isOpenCyclistList && cyclists.length > 0 && (
        <Prono cyclists={cyclists} />
      )}
    </div>
  );
};

export default Pronos;
