import React from "react";
import { Timestamp } from "firebase/firestore";
import "./stage.scss";
interface Props {
  stage: {
    stageId: number;
    startCity: string;
    endCity: string;
    date: string;
    lengthStage: number;
    type: string;
  };
}
const Stages: React.FC<Props> = ({ stage }) => {
  const timeObj = new Timestamp(stage.date.seconds, stage.date.nanoseconds);
  console.log(timeObj instanceof Timestamp);
  console.log(timeObj.toDate());
  return (
    <div className="stage">
      <h1>Etape n° {stage.stageId}</h1>
      {/* <h1>{stage.date}</h1> */}
      <h1>{`${stage.startCity} => ${stage.endCity}`}</h1>
      <h2>Type: {stage.type}</h2>
      <h2>{stage.lengthStage} km</h2>
    </div>
  );
};

export default Stages;
