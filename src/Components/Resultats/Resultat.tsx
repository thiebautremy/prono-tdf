/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState } from "react";
import { getTotalPoints, convertPointsInArray } from "../../Services/functions";
import "./Resultat.scss";

type ResultatType = {
  username: string;
  points: { [key: number]: number };
  pronos: any;
  position: number;
  color: string;
  previousTotalPoint: number;
};

const Resultat: React.FC<ResultatType> = ({
  username,
  points,
  pronos,
  position,
  color,
  previousTotalPoint,
}) => {
  const [modal, setModal] = useState({
    isVisible: false,
    value: [],
  });

  const { keys, values } = convertPointsInArray(points);
  const handleModal = (value: []) => {
    setModal({
      isVisible: true,
      value,
    });
  };

  return (
    <div className="resultat">
      {points === undefined && <p>Pas de points attribués</p>}
      <table className="resultat__table">
        {modal.isVisible && <Modal modal={modal} setModal={setModal} />}
        <tbody className="resultat__table__tbody">
          <tr className="resultat__table__tbody__tr">
            <td
              rowSpan={2}
              className={`resultat__table__tbody__td resultat__table__tbody__position ${
                position === 1
                  ? "gold"
                  : position === 2
                  ? "silver"
                  : position === 3 && "bronze"
              }`}
            >
              {position} <sup>{position === 1 ? "er" : "ième"}</sup>
            </td>
            <td
              className="resultat__table__tbody__username"
              style={{ backgroundColor: `rgba(${color}, 0.6)` }}
            >
              {username}
            </td>
            {keys.length > 0 &&
              keys.map((key, index) => (
                <td
                  key={index}
                  className="resultat__table__tbody__td resultat__table__tbody__key"
                  style={{ backgroundColor: `rgba(${color}, 0.6)` }}
                >
                  {key}
                </td>
              ))}
            <td
              className="resultat__table__tbody__average"
              style={{ backgroundColor: `rgba(${color}, 0.6)` }}
            >
              Moyenne :
            </td>
            <td
              className="resultat__table__tbody__username__last"
              rowSpan={2}
              style={{ backgroundColor: `rgba(${color}, 0.6)` }}
            >
              {username}
            </td>
          </tr>
          <tr>
            {values.length > 0 && (
              <>
                <td
                  className="resultat__table__tbody__td resultat__table__total"
                  style={{ backgroundColor: `rgba(${color}, 0.6)` }}
                >
                  Total:
                  <strong>{getTotalPoints(values)}</strong>
                  pts
                  {previousTotalPoint !== undefined && (
                    <span className="resultat__table__difference">{` ( + ${
                      previousTotalPoint - getTotalPoints(values)
                    } pts)`}</span>
                  )}
                </td>
              </>
            )}
            {values.length > 0 &&
              values.map((value, index) => (
                <td
                  className="resultat__table__tbody__td"
                  key={index}
                  onClick={() => handleModal(pronos[index + 1])}
                >
                  {value}
                </td>
              ))}
            <td className="resultat__table__tbody__td resultat__table__average">
              {Math.round(
                values.reduce(
                  (accumulator, currentValue) => accumulator + currentValue
                ) / values.length
              )}{" "}
              pts
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const Modal = (modal: any) => {
  return (
    <div className="modal">
      {modal.modal.value.map((item: any) => (
        <span key={item.name}>{item.name}</span>
      ))}
      <span
        className="cross"
        onClick={() =>
          modal.setModal({
            isVisible: false,
            value: modal.values,
          })
        }
      >
        X
      </span>
    </div>
  );
};

export default Resultat;
