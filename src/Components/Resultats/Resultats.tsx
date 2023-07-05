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
import map from "../../assets/pictures/f8d5d.jpg";
import { awardedPointsInfos } from "../../assets/points/pointsInfo";

const Resultats = () => {
  const [users, setUsers] = useState<DocumentData>([]);
  const db = getFirestore(app);
  const fetchUsers = async () => {
    const datas: DocumentData = [];
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const response = querySnapshot;
      if (response) {
        response.forEach((doc) => {
          datas.push(doc.data());
          setUsers(datas);
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  console.log(awardedPointsInfos);

  return (
    <div className="resultats">
      <div className="resultats__fixture">
        <h1>Classement</h1>
      </div>
      <div className="resultats__scores">
        {users.length > 0 &&
          users.map((user: UserConnectedInfo) => (
            <Resultat key={user.authId} {...user} />
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
