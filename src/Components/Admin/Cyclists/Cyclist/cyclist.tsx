import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import "./cyclist.scss";

interface CyclistInterface {
  lastname: string;
  number: number;
  team: string;
  firstname: string;
  nationality: string;
}
const Cyclist = ({
  firstname,
  lastname,
  nationality,
  team,
  number,
}: CyclistInterface) => {
  return (
    <div className="cyclist">
      <p className="cyclist__number">{number}</p>
      <p className="cyclist__lastname">{lastname}</p>
      <p className="cyclist__firstname">{firstname}</p>
      <p className="cyclist__nationality">{nationality}</p>
      <p className="cyclist__team">{team}</p>
      <div className="cyclist__garbage">
        <FaTrashAlt />
      </div>
    </div>
  );
};

export default Cyclist;
