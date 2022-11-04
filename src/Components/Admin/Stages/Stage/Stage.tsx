import React from "react";
import "./stage.scss";
import { getDateFormated } from "../../../../Services/functions";
import { FaArrowRight } from "react-icons/fa";
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
    stage && (
      <div className="stage">
        <h1 className="stage__title">
          Etape n° {stage.stageId}{" "}
          <span className="stage__title__date">
            {date} à {hour}
          </span>
        </h1>
        <p className="stage__cities">
          {stage.startCity} <FaArrowRight /> {stage.endCity}
        </p>
        <p className="stage__type">
          <strong className="stage__type__strong">Type: </strong>
          {stage.type}
        </p>
        <p className="stage__length">
          <strong className="stage__length__strong">Longueur: </strong>
          {stage.lengthStage} km
        </p>
      </div>
    )
  );
};

export default Stages;
