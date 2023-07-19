/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../Context/userContext";
import { StagesContext } from "../../Context/stagesContext";
import "./Profil.scss";
import {
  getFirestore,
  collection,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import app from "../../config/firebaseConfig";
type UserProfilType = {
  maxPoints: number;
  minPoints: number;
  average: number;
  maxPointsStageIndex: number | number[];
  minPointsStageIndex: number | number[];
};
const Profil = () => {
  const { userConnectedInfo } = useContext(UserContext);
  const [userProfil, setUserProfil] = useState<UserProfilType>({
    maxPoints: null,
    minPoints: null,
    average: null,
    maxPointsStageIndex: null,
    minPointsStageIndex: null,
  });
  const db = getFirestore(app);
  const { stages, setStages } = useContext(StagesContext);
  const fetchStages = async () => {
    const datas: DocumentData = [];
    try {
      const querySnapshot = await getDocs(collection(db, "stages"));
      const response = querySnapshot;
      if (response) {
        response.forEach((doc) => {
          datas.push(doc.data());
          setStages(datas);
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStages();
  }, []);

  function findIndexesOfValue(arr: number[], value: number) {
    const indexes = arr
      .map((element, index) => (element === value ? index + 1 : -1))
      .filter((index) => index !== -1);
    return indexes;
  }

  useEffect(() => {
    userConnectedInfo &&
      setUserProfil({
        ...userProfil,
        maxPoints: Math.max(...Object.values(userConnectedInfo?.points)),
        minPoints: Math.min(...Object.values(userConnectedInfo?.points)),
        average: Math.round(
          Object.values(userConnectedInfo?.points).reduce(
            (accumulator, currentValue) => accumulator + currentValue
          ) / Object.values(userConnectedInfo?.points).length
        ),
        maxPointsStageIndex: findIndexesOfValue(
          Object.values(userConnectedInfo?.points),
          userProfil.maxPoints
        ),
        minPointsStageIndex: findIndexesOfValue(
          Object.values(userConnectedInfo?.points),
          userProfil.minPoints
        ),
      });
  }, [userConnectedInfo]);

  return (
    <div className="profil">
      {userConnectedInfo && (
        <>
          <h1>{`Bonjour ${userConnectedInfo.username}`}</h1>
          <h2>{`Maximum sur une étape: ${userProfil.maxPoints} points`}</h2>
          <h2>{`Minimum sur une étape: ${userProfil.minPoints} points`}</h2>
          <h2>{`Moyenne par étape: ${userProfil.average} points`}</h2>
        </>
      )}
    </div>
  );
};

export default Profil;
