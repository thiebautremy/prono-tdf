import React, { useEffect, useContext, useState } from "react";
import { StagesContext } from "../../../Context/stagesContext";
import {
  getFirestore,
  collection,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { getDateFormated } from "../../../Services/functions";
import app from "../../../config/firebaseConfig";
import { Dropdown, DropdownChangeParams } from "primereact/dropdown";
import Stage from "../Stages/Stage/Stage";
import "./Calculate.scss";

const Calculate = () => {
  //TODO Récupérer les résultats en plus des pronos
  const [selectedStage, setSelectedStage] = useState(null);
  const [users, setUsers] = useState(null);
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
  const onStageChange = (e: DropdownChangeParams) => {
    const stageFound = stages.find((stage) => stage.stageId === e.value.code);
    setSelectedStage(stageFound);
  };

  useEffect(() => {
    fetchStages();
  }, []);
  const fetchUsers = async () => {
    const datas: [] = [];
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const response = querySnapshot;
      if (response) {
        response.forEach((doc) => {
          datas.push(doc.data());
          setUsers(datas);
        });
        calculatePoint(datas);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleCalculate = () => {
    fetchUsers();
  };

  const calculatePoint = (users) => {
    console.log(users);
    console.log(selectedStage);
    if (users.length > 0) {
      users.map(
        (user) =>
          user.pronos !== undefined &&
          console.log(user?.pronos[selectedStage.stageId])
      );
    }
  };
  return (
    <div className="calculate">
      <div className="calculate__header">
        <h1 className="calculate__header__title">
          Calculer les points des pronostiques
        </h1>
        {stages.length > 0 && (
          <Dropdown
            value={selectedStage}
            options={formatedArrayStagesForDropDown(stages)}
            onChange={onStageChange}
            // optionDisabled={(option) =>
            //   new Date(Date.now()).toUTCString() > option.date
            // }
            optionLabel="stage"
            placeholder="Sélectionne une étape"
          />
        )}
      </div>
      <div className="calculate__main">
        {selectedStage !== null && (
          <div className="calculate__stage">
            <Stage stage={selectedStage} />{" "}
            <button
              onClick={() => handleCalculate()}
              className="calculate__calculateBtn"
            >
              Caclculer les points des pronostiques
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculate;
