import React, { useEffect, useContext, useState } from "react";
import { StagesContext } from "../../../Context/stagesContext";
import { CyclistsContext } from "../../../Context/cyclistsContext";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import app from "../../../config/firebaseConfig";
import { Dropdown } from "primereact/dropdown";
import { getDateFormated } from "../../../Services/functions";
import Stage from "../Stages/Stage/Stage";
import InformResult from "./InformResult/InformResult";
import "./InformResults.scss";

const InformResults = () => {
  const [isOpenCyclistList, setIsOpenCyclistList] = useState(false);
  const [selectedStage, setSelectedStage] = useState<{
    stageId: number;
    startCity: string;
    endCity: string;
    date: { seconds: number; nanoseconds: number };
    lengthStage: number;
    type: string;
  } | null>(null);
  const [results, setResults] = useState({});
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

  const fetchResults = async (stageFound: { stageId: string }) => {
    try {
      const res = await getDoc(
        doc(db, "results", stageFound.stageId.toString())
      );
      res.data() === undefined ? setResults({}) : setResults(res.data());
      setSelectedStage(stageFound);
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
    void fetchStages();
    void fetchCyclists();
  }, []);
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
      stageId: number;
      startCity: string;
      endCity: string;
      date: { seconds: number; nanoseconds: number };
    }[]
  ) => {
    const arrayFormated = [];
    for (let i = 0; i < arrayToChanged.length; i++) {
      const object: {
        stage: string;
        code: number | null;
        date: string;
      } = {
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
    setResults({});
    void fetchResults(stageFound);
  };
  return (
    <div className="informResults">
      <div className="informResults__header">
        <h1 className="informResults__header__title">
          Renseigne les résultats
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
      <div className="informResults__main">
        {selectedStage !== null && (
          <div className="informResults__stage">
            <Stage stage={selectedStage} />{" "}
            <button
              onClick={() => setIsOpenCyclistList(true)}
              className="informResults__setResultsBtn"
            >
              Ajouter les résultats de l'étape
            </button>
          </div>
        )}
        {isOpenCyclistList && cyclists.length > 0 && (
          <InformResult
            cyclists={cyclists}
            stageId={selectedStage.stageId}
            currentResults={results}
          />
        )}
      </div>
    </div>
  );
};
export default InformResults;
