import React, { useEffect, useContext, useState } from "react";
import { StagesContext } from "../../../Context/stagesContext";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  updateDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { getDateFormated } from "../../../Services/functions";
import app from "../../../config/firebaseConfig";
import { Dropdown, DropdownChangeParams } from "primereact/dropdown";
import Stage from "../Stages/Stage/Stage";
import "./Calculate.scss";
import ErrorMessage from "../../Form/ErrorMessage/errorMessage";
import { awardedPoints } from "../../../assets/points/points";
import UserContext from "../../../Context/userContext";
import Dialogue from "../../Dialogue/Dialogue";

const Calculate = () => {
  const [selectedStage, setSelectedStage] = useState(null);
  const [users, setUsers] = useState(null);
  const [error, setError] = useState("");
  const [results, setResults] = useState({});
  const { stages, setStages } = useContext(StagesContext);
  const { setUserConnectedInfo } = useContext(UserContext);
  const [visibleModal, setVisibleModal] = useState(false);

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
  function getSum(total, num) {
    return total + num;
  }
  const calculatePoint = () => {
    const stageId: number = selectedStage.stageId;
    if (users.length > 0) {
      users.map((user) => {
        if (user.pronos !== undefined) {
          const totalPointArray = [];
          const pronoUser = user?.pronos?.[stageId];
          pronoUser.map((prono) => {
            const cyclistPosition = Object.values(results).findIndex(
              (result) => result.number === prono.code
            );
            if (cyclistPosition >= 0) {
              totalPointArray.push(awardedPoints[0][cyclistPosition + 1]);
            }
          });
          setPointInDb(user, stageId, totalPointArray);
        }
      });
    }
  };

  const setPointInDb = async (user, stageId, totalPoint) => {
    const pointsObj = { ...user?.points };
    pointsObj[stageId] = totalPoint.reduce(getSum);
    const userRef = doc(db, "users", `${user.authId}`);
    await updateDoc(userRef, {
      points: pointsObj,
    });
    const userDocumentDbRef = await getDoc(doc(db, "users", user.authId));
    setUserConnectedInfo(userDocumentDbRef.data());
    setVisibleModal(true);
  };
  return (
    <div className="calculate">
      <Dialogue
        isVisible={visibleModal}
        setIsVisible={setVisibleModal}
        message={"Tous les calculs ont été effectués"}
      />
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
