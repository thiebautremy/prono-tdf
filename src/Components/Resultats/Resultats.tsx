/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect, useState } from "react";
import app from "../../config/firebaseConfig";
import {
  getFirestore,
  collection,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import { UserConnectedInfo } from "../../Context/userContext";
import Resultat from "./Resultat";
import "./Resultats.scss";
import map from "../../assets/pictures/trace.webp";
import { awardedPointsInfos } from "../../assets/points/pointsInfo";
import { convertPointsInArray, getTotalPoints } from "../../Services/functions";
import Loader from "../Loader/Loader";

const Resultats = () => {
  const [users, setUsers] = useState<DocumentData>([]);

  const db = getFirestore(app);
  const fetchUsers = async () => {
    const datas: DocumentData = [];
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const response = querySnapshot;
      console.log(response)
      if (response) {
        response.forEach((doc) => {
          console.log(doc.data())
          datas.push(doc.data());
          calculateTotalAndSetState(datas);
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
        const { values } = convertPointsInArray(user?.points);
        user["total"] = values.reduce(
          (accumulator: any, currentValue: any) => accumulator + currentValue
        );
        usersUpdated.push(user);
      });
    }
    setUsers(usersUpdated);
  };

  return (
    <div className="resultats">
      <div className="resultats__fixture">
        <h1>Classement</h1>
      </div>
      <div className="resultats__scores">
        {users.length > 0 ? (
          users
            .sort(
              (a: { total: number }, b: { total: number }) => b.total - a.total
            )
            .map((user: UserConnectedInfo, index: number) => (
              <Resultat
                key={user.authId}
                {...user}
                position={index + 1}
                previousTotalPoint={
                  index > 0
                    ? getTotalPoints(
                        convertPointsInArray(users[index - 1]?.points).values
                      )
                    : undefined
                }
              />
            ))
        ) : (
          <Loader />
        )}
      </div>
      <div>
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
      </div>
      <img src={map} alt="" className="map" />
    </div>
  );
};

export default Resultats;
