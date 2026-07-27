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
import Resultat, { StageRanks } from "./Resultat";
import "./Resultats.scss";
import map from "../../assets/pictures/trace.webp";
import { awardedPointsInfos } from "../../assets/points/pointsInfo";
import { convertPointsInArray, getTotalPoints } from "../../Services/functions";
import Loader from "../Loader/Loader";

const computeStageRanks = (
  users: Array<{ authId: string; points: Record<string, number> }>,
): Record<string, StageRanks> => {
  const allStageKeys = new Set<string>();
  users.forEach((u) =>
    Object.keys(u.points).forEach((k) => allStageKeys.add(k)),
  );

  const result: Record<string, StageRanks> = {};
  users.forEach((u) => {
    result[u.authId] = {};
  });

  allStageKeys.forEach((stageKey) => {
    const participants = users
      .filter((u) => stageKey in u.points)
      .sort((a, b) => b.points[stageKey] - a.points[stageKey]);

    participants.forEach((u, index) => {
      result[u.authId][stageKey] = index + 1;
    });
  });

  return result;
};

const Resultats = () => {
  const [users, setUsers] = useState<DocumentData>([]);
  const [stageRanksMap, setStageRanksMap] = useState<
    Record<string, StageRanks>
  >({});
  const [isLoading, setIsLoading] = useState(true);

  const db = getFirestore(app);

  const fetchUsers = async () => {
    const datas: DocumentData = [];
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      if (querySnapshot) {
        querySnapshot.forEach((doc) => {
          datas.push(doc.data());
        });
        calculateTotalAndSetState(datas);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const calculateTotalAndSetState = (datas: [] | DocumentData) => {
    const usersUpdated: any[] = [];

    if (datas.length > 0) {
      datas
        .filter(
          (user: { total?: number; points: {} }) =>
            Object.keys(user.points).length > 0,
        )
        .map((user: { total?: number; points: {} }) => {
          const { values } = convertPointsInArray(user?.points);
          user["total"] = values.reduce(
            (accumulator: any, currentValue: any) => accumulator + currentValue,
            0,
          );
          usersUpdated.push(user);
        });
    }

    const ranks = computeStageRanks(
      usersUpdated.map((u) => ({
        authId: u.authId,
        points: u.points as Record<string, number>,
      })),
    );

    setUsers(usersUpdated);
    setStageRanksMap(ranks);
  };

  return (
    <div className="resultats">
      <div className="resultats__fixture">
        <h1>Classement</h1>
      </div>

      <div className="resultats__scores">
        {isLoading ? (
          <Loader />
        ) : users.length > 0 ? (
          <>
            <div className="resultats__legend">
              <span className="resultats__legend__item resultats__legend__item--gold">
                1er de l'étape
              </span>
              <span className="resultats__legend__item resultats__legend__item--silver">
                2ième
              </span>
              <span className="resultats__legend__item resultats__legend__item--bronze">
                3ième
              </span>
              <span className="resultats__legend__item resultats__legend__item--other">
                Autres
              </span>
              <span className="resultats__legend__item resultats__legend__item--empty">
                Pas joué
              </span>
            </div>
            {users
              .sort(
                (a: { total: number }, b: { total: number }) =>
                  b.total - a.total,
              )
              .map((user: UserConnectedInfo, index: number) => (
                <Resultat
                  key={user.authId}
                  {...user}
                  position={index + 1}
                  previousTotalPoint={
                    index > 0
                      ? getTotalPoints(
                          convertPointsInArray(users[index - 1]?.points).values,
                        )
                      : undefined
                  }
                  stageRanks={stageRanksMap[user.authId] ?? {}}
                />
              ))}
          </>
        ) : (
          <p className="resultats__empty">
            Aucun résultat disponible pour le moment.
          </p>
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
