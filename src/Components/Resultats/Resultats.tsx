/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect, useState, useContext } from "react";
import app from "../../config/firebaseConfig";
import {
  getFirestore,
  collection,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import { UserConnectedInfo } from "../../Context/userContext";
import { UsersContext } from "../../Context/usersContext";
import Resultat from "./Resultat";
import "./Resultats.scss";
import map from "../../assets/pictures/f8d5d.jpg";
import { awardedPointsInfos } from "../../assets/points/pointsInfo";

const Resultats = () => {
  const [users, setUsers] = useState<DocumentData>([]);

  const { setUsersData } = useContext(UsersContext);

  const db = getFirestore(app);
  const fetchUsers = async () => {
    const datas: DocumentData = [];
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const response = querySnapshot;
      if (response) {
        response.forEach((doc) => {
          datas.push(doc.data());
          calculateTotalAndSetState(datas);
          setUsersData(datas);
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const calculateTotalAndSetState = (datas: [] | DocumentData) => {
    const usersUpdated:
      | React.SetStateAction<DocumentData>
      | Map<unknown, unknown>[] = [];
    if (datas.length > 0) {
      datas.map((user: { total?: number; points: {} }) => {
        const { values } = convertPointsInArray(user.points);
        user["total"] = values.reduce(
          (accumulator: any, currentValue: any) => accumulator + currentValue
        );
        usersUpdated.push(user);
      });
    }
    setUsers(usersUpdated);
  };

  const convertPointsInArray = (points: { [key: number]: number }) => {
    let keys: string[] = [];
    let values: number[] = [];
    if (points !== undefined) {
      keys = Object.keys(points);
      values = Object.values(points);
    }
    return { keys, values };
  };

  return (
    <div className="resultats">
      <div className="resultats__fixture">
        <h1>Classement</h1>
      </div>
      <div className="resultats__scores">
        {users.length > 0 &&
          users
            .sort(
              (a: { total: number }, b: { total: number }) => b.total - a.total
            )
            .map((user: UserConnectedInfo, index: number) => (
              <Resultat key={user.authId} {...user} position={index + 1} />
            ))}
      </div>
      <h2>Points attribués en fonction du classement du coureur</h2>
      <table className="resultats__table">
        <thead>
          <tr>
            <th>Position</th>
            <th>Points attribués</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(awardedPointsInfos).map((awardedPoint, index) => (
            <tr key={index}>
              <td>
                <sup>{awardedPoint.position}</sup>
              </td>
              <td>{`${awardedPoint.points} pts`}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <img src={map} alt="" className="map" />
    </div>
  );
};

export default Resultats;
