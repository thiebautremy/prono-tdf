/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
  DocumentData,
  DocumentReference,
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
import { useFetch } from "../../../Services/api";

const Calculate = () => {
  const [selectedStage, setSelectedStage] = useState<{
    stageId: number;
    startCity: string;
    endCity: string;
    date: { seconds: number; nanoseconds: number };
    lengthStage: number;
    type: string;
  } | null>(null);
  const [users, setUsers] = useState<
    { pronos: unknown; authId: string }[] | null
  >(null);
  const [error, setError] = useState("");
  const [results, setResults] = useState({});
  const { stages, setStages } = useContext(StagesContext);
  const { setUserConnectedInfo } = useContext(UserContext);
  const [visibleModal, setVisibleModal] = useState(false);

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

  const fetchResults = async (stageId: number) => {
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
  const formatedArrayStagesForDropDown = (
    arrayToChanged: {
      date: { seconds: number; nanoseconds: number };
      stageId: number;
      endCity: string;
      startCity: string;
    }[]
  ) => {
    const arrayFormated = [];
    for (let i = 0; i < arrayToChanged.length; i++) {
      const object: { stage: string; code: number; date: string } = {
        stage: "",
        code: null,
        date: null,
      };
      const { date } = getDateFormated(arrayToChanged[i].date);
      object.stage = `Etape n°${arrayToChanged[i].stageId} : ${arrayToChanged[i].startCity} - ${arrayToChanged[i].endCity} le ${date}`;
      object.code = arrayToChanged[i].stageId;
      object.date = formatedDateFromFirebase(arrayToChanged[i].date);
      arrayFormated.push(object);
    }
    return arrayFormated;
  };
  const onStageChange = (e: { value: { code: number } }) => {
    const stageFound = stages.find((stage) => stage.stageId === e.value.code);
    setError("");
    setSelectedStage(stageFound);
    void fetchResults(stageFound?.stageId);
  };
  const { status: statusUsers, data: dataUsers } = useFetch("users");
  useEffect(() => {
    void fetchStages();
    statusUsers === "fetched" && setUsers(dataUsers);
    return () => setUsers([]);
  }, [statusUsers]);

  const handleCalculate = () => {
    if (Object.keys(results).length === 0) {
      setError("Les résultats de l'étape n'ont pas été renseignés");
    } else {
      calculatePoint();
    }
  };
  function getSum(total: number, num: number) {
    return total + num;
  }
  const calculatePoint = () => {
    const stageId: number = selectedStage.stageId;
    if (users.length > 0) {
      users.map((user: { pronos: [stageId: []]; authId: string }) => {
        if (user.pronos !== undefined) {
          const totalPointArray: string[] = [];
          const pronoUser: [] = user?.pronos?.[stageId];
          if (pronoUser !== undefined) {
            pronoUser.map((prono: { code: string }) => {
              const cyclistPosition = Object.values(results).findIndex(
                (result) => result.number === prono.code
              );
              if (cyclistPosition >= 0) {
                totalPointArray.push(awardedPoints[0][cyclistPosition + 1]);
              }
            });
            getUsersRef(user.authId, stageId, totalPointArray);
          }
        }
      });
    }
  };

  const getUsersRef = (
    userId: string,
    stageId: number,
    totalPoint: string[]
  ) => {
    const refUser = doc(db, "users", `${userId}`);
    void setPointsInDb(refUser, userId, stageId, totalPoint);
  };

  const setPointsInDb = async (
    refUser: DocumentReference<DocumentData>,
    userId: string,
    stageId: number,
    totalPoint: string[]
  ) => {
    const userDocumentDbRef = await getDoc(doc(db, "users", userId));
    const pointsObj = { ...userDocumentDbRef.data()?.points };
    pointsObj[stageId] = totalPoint.reduce(getSum);
    const data = { points: pointsObj };
    return updateDoc(refUser, {
      ...data,
    })
      .then(async () => {
        const userDocumentDbRef = await getDoc(doc(db, "users", userId));
        setUserConnectedInfo(userDocumentDbRef.data());
        setVisibleModal(true);
      })
      .catch(() => console.log("error"));
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
