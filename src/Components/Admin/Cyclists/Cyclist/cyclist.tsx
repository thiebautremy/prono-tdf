import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import "./cyclist.scss";

interface CyclistInterface {
  lastname: string;
  number: string | number;
  team: string;
  firstname: string;
  nationality: string;
  setIsConfirmDialog: (prev: boolean) => void;
  setMessage: (prev: {
    number: string;
    lastname: string;
    firstname: string;
  }) => void;
}
const Cyclist = ({
  firstname,
  lastname,
  nationality,
  team,
  number,
  setIsConfirmDialog,
  setMessage,
}: CyclistInterface) => {
  const confirmDelete = (
    number: string,
    firstname: string,
    lastname: string
  ) => {
    setMessage({ number, firstname, lastname });
    setIsConfirmDialog(true);
  };

  return (
    <div className="cyclist">
      <p className="cyclist__number">{number}</p>
      <p className="cyclist__lastname">{lastname}</p>
      <p className="cyclist__firstname">{firstname}</p>
      <p className="cyclist__nationality">{nationality}</p>
      <p className="cyclist__team">{team}</p>
      <div className="cyclist__garbage">
        <FaTrashAlt
          onClick={() => confirmDelete(number.toString(), firstname, lastname)}
        />
      </div>
    </div>
  );
};

export default Cyclist;
