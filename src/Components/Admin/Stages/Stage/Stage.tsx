import React from "react";
import "./stage.scss";
import { getDateFormated } from "../../../../Services/functions";
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
  const { date, hour } = getDateFormated(stage.date);
  return (
    <div className="stage">
      <h1>Etape n° {stage.stageId}</h1>
      <h1>
        {date} à {hour}
      </h1>
      <h1>{`${stage.startCity} => ${stage.endCity}`}</h1>
      <h2>Type: {stage.type}</h2>
      <h2>{stage.lengthStage} km</h2>
    </div>
  );
};

export default Stages;
