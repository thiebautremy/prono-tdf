import React from "react";
import "./Resultat.scss";

type ResultatType = {
  username: string;
  points: { [key: number]: number };
};
const Resultat: React.FC<ResultatType> = ({ username, points }) => {
  const convertPointsInArray = (points: { [key: number]: number }) => {
    let keys: string[] = [];
    let values: number[] = [];
    if (points !== undefined) {
      keys = Object.keys(points);
      values = Object.values(points);
    }
    return { keys, values };
  };
  const { keys, values } = convertPointsInArray(points);
  return (
    <div className="resultat">
      <h1 className="resultat__username">{username}</h1>
      {points === undefined && <p>Pas de points attribués</p>}
      <table className="resultat__table">
        <thead className="resultat__table__thead">
          <tr className="resultat__table__thead__tr">
            {keys.length > 0 &&
              keys.map((key) => (
                <th key={key} className="resultat__table__thead__th">
                  {key}
                </th>
              ))}
          </tr>
        </thead>
        <tbody className="resultat__table__tbody">
          <tr className="resultat__table__tbody__tr">
            {values.length > 0 &&
              values.map((value) => (
                <td className="resultat__table__tbody__td" key={value}>
                  {value}
                </td>
              ))}
            {values.length > 0 && (
              <td className="resultat__table__tbody__td resultat__table__total">
                Total:
                <strong>
                  {values.reduce(
                    (accumulator, currentValue) => accumulator + currentValue
                  )}
                </strong>
              </td>
            )}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Resultat;
