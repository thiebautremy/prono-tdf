import React, { useEffect, useContext, useState } from "react";
import { StagesContext } from "../../../Context/stagesContext";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { getDateFormated } from "../../../Services/functions";
import app from "../../../config/firebaseConfig";
import { Dropdown, DropdownChangeParams } from "primereact/dropdown";
import Stage from "../Stages/Stage/Stage";
import "./Calculate.scss";
import ErrorMessage from "../../Form/ErrorMessage/errorMessage";

const Calculate = () => {
  //TODO Récupérer les résultats en plus des pronos
  const [selectedStage, setSelectedStage] = useState(null);
  const [users, setUsers] = useState(null);
  const [error, setError] = useState("");
  const [results, setResults] = useState({});
  const { stages, setStages } = useContext(StagesContext);
  const db = getFirestore(app);

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
      }
    } catch (err) {
      console.log(err);
    }
  };

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

  const fetchResults = async (stageId) => {
    try {
      const res = await getDoc(doc(db, "results", stageId.toString()));
      console.log(res);
      res.data() === undefined ? setResults({}) : setResults(res.data());
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
    setError("");
    setSelectedStage(stageFound);
    fetchResults(stageFound?.stageId);
  };

  useEffect(() => {
    fetchStages();
    fetchUsers();
  }, []);

  const handleCalculate = () => {
    if (Object.keys(results).length === 0) {
      setError("Les résultats de l'étape n'ont pas été renseignés");
    } else {
      calculatePoint();
    }
  };

  const calculatePoint = () => {
    console.log(users);
    console.log(selectedStage);
    if (users.length > 0) {
      users.map((user) => {
        if (user.pronos !== undefined) {
          console.log(user?.pronos[selectedStage.stageId]);
          const pronoUser = user?.pronos[selectedStage.stageId];
          //TODO Retrouver les points attribués en fonction des bonnes places trouvées
          //TODO Calculer les points et les set en bdd dans la table du user correspondant
          //TODO Catcher le success de la requête pour afficher un message de succès
        }
      });
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
            {error.length > 0 && <ErrorMessage message={error} />}
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
