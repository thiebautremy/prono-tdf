import React from "react";
import { Timestamp } from "firebase/firestore";
import "./stage.scss";
interface Props {
  stage: {
    stageId: number;
    startCity: string;
    endCity: string;
    date: { seconds: number; nanoseconds: number };
    lengthStage: number;
    type: string;
  };
}
const Stages: React.FC<Props> = ({ stage }) => {
  //TODO Faire une fonction générique pour la date en retournant un objet avec la date formatée et l'heure {date, time}
  const getDateFormated = (timestampFirestore: {
    seconds: number;
    nanoseconds: number;
  }) => {
    const timeObj = new Timestamp(
      timestampFirestore.seconds,
      timestampFirestore.nanoseconds
    );
    const dateAndHour = timeObj.toDate();
    const minutes =
      dateAndHour.getMinutes() < 10
        ? `0${dateAndHour.getMinutes()}`
        : `${dateAndHour.getMinutes()}`;
    return `${dateAndHour.getDate()}/${
      dateAndHour.getMonth() + 1
    }/${dateAndHour.getUTCFullYear()} à ${dateAndHour.getHours()}:${minutes}`;
  };

  console.log(getDateFormated(stage.date));
  return (
    <div className="stage">
      <h1>Etape n° {stage.stageId}</h1>
      <h1>{getDateFormated(stage.date)}</h1>
      <h1>{`${stage.startCity} => ${stage.endCity}`}</h1>
      <h2>Type: {stage.type}</h2>
      <h2>{stage.lengthStage} km</h2>
    </div>
  );
};

export default Stages;
