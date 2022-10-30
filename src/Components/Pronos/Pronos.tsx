import React, { useContext, useEffect, useState } from "react";
import { StagesContext } from "../../Context/stagesContext";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from "../../config/firebaseConfig";
import Stage from "../Admin/Stages/Stage/Stage";
import { Dropdown, DropdownChangeParams } from "primereact/dropdown";

const Pronos = () => {
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
  useEffect(() => {
    fetchStages();
  }, []);
  const [selectedStage, setSelectedStage] = useState(null);
  const onStageChange = (e: DropdownChangeParams) => {
    const stageFound = stages.find((stage) => stage.stageId === e.value.code);
    setSelectedStage(stageFound);
  };

  const formatedArrayStagesForDropDown = (arrayToChanged) => {
    let arrayFormated = [];
    for (let i = 0; i < arrayToChanged.length; i++) {
      let object = {};
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
      {selectedStage !== null && <Stage stage={selectedStage} />}
    </div>
  );
};

export default Pronos;
