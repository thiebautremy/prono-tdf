/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/unbound-method */
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
  Timestamp,
} from "firebase/firestore";
import app from "../../config/firebaseConfig";
import Stage from "../Admin/Stages/Stage/Stage";
import { Dropdown, DropdownChangeParams } from "primereact/dropdown";
import { getDateFormatedWithoutYearAndHour } from "../../Services/functions";
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
        optionDisabled: boolean;
      } = {
        stage: "",
        date: "",
        code: null,
        optionDisabled: false,
      };
      object.stage = `n°${arrayToChanged[i].stageId}: ${
        arrayToChanged[i].startCity
      } - ${arrayToChanged[i].endCity} ${
        getDateFormatedWithoutYearAndHour(arrayToChanged[i].date).date
      }`;
      object.code = arrayToChanged[i].stageId;
      object.date = formatedDateFromFirebase(arrayToChanged[i].date);
      const stageDate = new Date(
        formatedDateFromFirebase(arrayToChanged[i].date)
      );
      const desiredOffset = -120;
      const currentOffset = stageDate.getTimezoneOffset();
      const offsetDiff = desiredOffset - currentOffset;
      const newStageDate = stageDate.setMinutes(
        stageDate.getMinutes() + offsetDiff
      );
      const currentDate = new Date();
      object.optionDisabled = currentDate > new Date(newStageDate);
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
            optionDisabled="optionDisabled"
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
